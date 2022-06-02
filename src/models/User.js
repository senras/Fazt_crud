const bcryptjs = require("bcryptjs");
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	date: { type: Date, default: Date.now },
});

UserSchema.methods.encryptPassword = async (password) => {
	const salt = await bcryptjs.genSaltSync(10);
	const hash = bcryptjs.hashSync(password, salt);
	return hash;
};

UserSchema.methods.matchPassword = async function (password) {
	return await bcryptjs.compareSync(password, this.password);
};

module.exports = model("User", UserSchema);
