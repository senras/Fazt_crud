const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const { dbConnection } = require("./database");
require("dotenv").config();

//Initializations
const app = express();
require("./config/passport");
dbConnection();

//Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
	".hbs",
	exphbs.engine({
		defaultLayout: "main",
		layoutsDir: path.join(app.get("views"), "layouts"),
		partialsDir: path.join(app.get("views"), "partials"),
		extname: ".hbs",
	}),
);
app.set("view engine", ".hbs");

//Middlewares
app.use(express.urlencoded({ extended: false })); //El extended en false es para que los formularios no reciban imagenes
app.use(methodOverride("_method")); //Para que los formularios pueden mandar otros metodos http
app.use(
	session({
		secret: "mysecretphrase",
		resave: true,
		saveUninitialized: true,
	}),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	res.locals.error = req.flash("error");
	next();
});

//Routes
app.use(require("./routes/index"));
app.use(require("./routes/notes"));
app.use(require("./routes/users"));

//Static Files
app.use(express.static(path.join(__dirname, "public")));

//Server is listening
app.listen(app.get("port"), () => {
	console.log("Server on port", app.get("port"));
});
