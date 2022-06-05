import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "./models/user.js";




const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());



const mongoDB = process.env.DATABASE_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get("/", async(req, res) => {
    res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>node-express-example</title>
            </head>
            <body>
                <ul>
                <li>available methods</li>
                <li>/user/save => params {name,email}</li>
                <li>/user/:id {its get my data :)) }</li>
                </ul>
            </body>
            </html>
            `);
});

app.post('/user/save', async(req, res) => {
    const name = req.body.name;
    if (name == null || name == undefined) {
        res.json({
            status: 0,
            message: "Inputs can not be null"
        }).status(203);
    }
    const mail = req.body.mail;
    if (mail == null || mail == undefined) {
        res.json({
            status: 0,
            message: "Inputs can not be null"
        }).status(203);
    }
    let user = new User({ name: name, mail: mail });
    await user.save(e => {
        if (e != null) {
            res.json(e);
        }
    })
    res.json({
            status: 1,
            message: "Data saved successfully"
        })
        .status(200);
})

app.get('/user/:id', async(req, res) => {
    const user_id = "629d3e7c2a9fae76be5b340a"; //req.params.id;
    const user = await User.findById(user_id, 'name mail created_at').exec();
    res.json({ status: 1, user: user }).status(200);
})





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Ready on http://localhost:" + PORT)
});