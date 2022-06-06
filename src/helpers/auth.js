const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		res.locals.user = req.user.toJSON() || null;
		return next();
	}
	req.flash("error msg", "Not Authorized");
	res.redirect("/users/signin");
};

module.exports = isAuthenticated;
