import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";



const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", async(req, res) => {
    res.send("Merhabaa");
});

app.post('/', async(req, res) => {
    res.json({
            status: 1,
            message: "acceessed index"
        })
        .status(200);
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Ready on http://localhost:" + PORT)
});