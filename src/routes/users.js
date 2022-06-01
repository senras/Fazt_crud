const { Router } = require("express");
const router = Router();

router.get("/users/signin", (req, res) => {
	res.render("users/signin");
});

router.get("/users/signup", (req, res) => {
	res.render("users/signup");
});

router.get("/users/signout", (req, res) => {
	res.send("Cerrando Sesión");
});

module.exports = router;
