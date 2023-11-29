const express = require('express');
const app = express()
const mongoose = require('mongoose');
const path = require('path');
const bodyparser = require('body-parser');
require('dotenv').config();
const { Schema } = mongoose;
mongoose.connect(process.env.DB_URI);
//console.log(process.env);

app.use("/", express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({"extended": true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/app.html");
})
app.use((req, res) => {
    res.status(404)
    res.send(`<h1>Error 404: Resources not found</h1>`)
})


const formSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    age: {type: Number, required: true},
    height: {type: Number, required: true},
    mobile_number: {type: Number, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    educational_institution: {type: String, required: true},
    start_date: {type: String, required: true},
    end_date: {type: String, required: true},
    religion: {type: String, required: true},
    language: {type: String, required: true},
    other_language: {type: String, required: true},
    occupation: {type: String, required: true},
    favorite_food: {type: String, required: true},
    short_term_goals: {type: String, required: true},
    long_term_goals: {type: String, required: true},
    user_feedback: {type: String, required: true}
});

let Demographic_survey = mongoose.model("Demographic_survey", formSchema);

app.post("/api/survey", (req, res) => {
    let data = req.body
    console.log(req.body);
    res.json(data);
})





const listener = app.listen(3000, () => {
    console.log(`Server listening on port 3000`)
})
