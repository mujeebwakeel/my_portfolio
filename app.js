var express = require("express");
var app = express();
var Message = require("./model/contact")
var bodyParser = require("body-parser");
var session = require('express-session')
var MemoryStore = require('memorystore')(session);
var mongoose = require("mongoose");
var moment = require("moment");
var flash = require("connect-flash");
require('dotenv').config();

var port = process.env.PORT || 8000

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, 'useUnifiedTopology': true, 'useFindAndModify': false, useCreateIndex: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());

app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: "I want to be the best in all I do",
    resave: false,
    saveUninitialized: false
}));

app.use(function(req,res,next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.get("/", function(req,res) {
    res.render("portfolio");
})

app.post("/contact", function(req,res) {
    var message = new Message({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        date: moment().format("LLL")
    }) 
    
    message.save(function(err, createdMessage) {
        if(err || !createdMessage) {
            req.flash("error", "Message not sent");
            return res.redirect("/");
        }
        req.flash("success", "Message successfully sent");
        res.redirect("/");
    });
});

app.get("/chat", function(req,res) {
    Message.find({}, function(err, foundMessages) {
        if(err || !foundMessages){
            req.flash("error", "Something went wrong");
            return res.redirect("/");
        }
        res.render("chat", {messages: foundMessages});
    })
})

app.get("/message", function(req,res) {
    Message.find({}, function(err, foundMessages) {
        if(err || !foundMessages) {
            return res.send("Hoops");
        }
        res.send(foundMessages)

    })
})



app.get("*", function(req,res) {
    res.send("No such url exists on this server");
})

app.listen(port, process.env.IP, function(){
    console.log("Server has started");
});