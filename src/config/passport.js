const passport = require("passport");
const { Strategy } = require("passport-local");

const User = require("../models/User");

passport.use(
	new Strategy(
		{
			usernameField: "email",
		},
		async (email, password, done) => {
			const user = await User.findOne({ email: email });
			if (!user) {
				return done(null, false, { message: "Not User found." });
			} else {
				const match = await user.matchPassword(password);
				if (match) {
					return done(null, user);
				} else {
					return done(null, false, { message: "Not User found." });
				}
			}
		},
	),
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});
