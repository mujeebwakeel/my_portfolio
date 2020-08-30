var mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: String
});


module.exports = mongoose.model("Message", messageSchema);

