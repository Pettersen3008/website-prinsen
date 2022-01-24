// Import modules
import mongoose from "mongoose";

// User schema for database
const userScheme = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    phone: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});


module.exports = mongoose.models.User || mongoose.model("User", userScheme);