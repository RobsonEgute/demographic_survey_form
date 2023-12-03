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
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/app.html");
})
// app.use((req, res) => {
//     res.status(404)
//     res.send(`<h1>Error 404: Resources not found</h1>`)
// })


const formSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: Number,
    height: Number,
    mobile_number: Number,
    email: String,
    address: String,
    educational_institution: String,
    start_date: String,
    end_date: String,
    religion: String,
    language: String,
    other_language: String,
    occupation: String,
    favorite_food: String,
    short_term_goals: String,
    long_term_goals: String,
    user_feedback: String
});

const Demographic_survey = mongoose.model("Demographic_survey", formSchema);

app.post( "/api/survey", async (req, res) => {
    let data = req.body
    console.log(data);
    let surveyObj = new Demographic_survey({
        firstname: data['first_name'],
        lastname: data['last_name'],
        age: data.age,
        height: data.height,
        mobile_number: data.number,
        email: data.email,
        address: data.address,
        educational_institution: data.educational_institution_1,
        start_date: data.start_date,
        end_date: data.end_date,
        religion: data.religion,
        language: data.language,
        other_language: data['specified_language'],
        occupation: data.occupation,
        favorite_food: data['favorite_food'],
        short_term_goals: data['short_term_goals'],
        long_term_goals: data['longterm_goals'],
        user_feedback: data['survey_review']
    })

    try {
        let saveUser = await surveyObj.save();
        console.log('----------------');
        console.log(saveUser);
        console.log('----------------');
        res.send('Success');
        return;
    } catch(err) {
        console.log(err)
    }
})





const listener = app.listen(3000, () => {
    console.log(`Server listening on port 3000`)
})
