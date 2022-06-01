const { Router } = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const router = Router();

router.get("/notes/add", (req, res) => {
	res.render("notes/new-note");
});

router.post("/notes/new-note", (req, res) => {
	const { title, description } = req.body;
	let errors = [];
	if (!title) {
		errors.push({ text: "Please Write a Title" });
	}
	if (!description) {
		errors.push({ text: "Please Write a Description" });
	}
	if (errors.length > 0) {
		res.render("notes/new-note", {
			errors,
			title,
			description,
		});
	} else {
		res.send("Ok");
	}
});

router.get("/notes", (req, res) => {
	res.send("Notas de la DB");
});

module.exports = router;
