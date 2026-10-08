const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://kadhithya005_db_user:LTsedemlrnqDib2C@cluster0.mzaqn4k.mongodb.net";

mongoose.connect(MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

const donorSchema = new mongoose.Schema({
    donorId: Number,
    name: String,
    age: Number,
    email: String,
    phone: String,
    bloodGroup: String,
    gender: String,
    date: String
});

const Donor = mongoose.model("Donor", donorSchema);


app.post("/donor", async (req, res) => {

    try {
        let last = await Donor.findOne().sort({ donorId: -1 });
        let newId = last ? last.donorId + 1 : 101;

        let donor = new Donor({
            donorId: newId,
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            phone: req.body.phone,
            bloodGroup: req.body.bloodGroup,
            gender: req.body.gender,
            date: req.body.date
        });

        await donor.save();
        res.send("Donor added successfully. Donor ID: " + newId);
    }
    catch (err) {
        res.status(500).send("Error while adding donor");
    }

});


app.get("/donors", async (req, res) => {

    try {
        let donors = await Donor.find();
        res.json(donors);
    }
    catch (err) {
        res.status(500).send("Error while getting donors");
    }

});


app.get("/donor/:id", async (req, res) => {

    try {
        let donor = await Donor.findOne({ donorId: req.params.id });

        if (!donor) {
            return res.status(404).send("Donor not found");
        }

        res.json(donor);
    }
    catch (err) {
        res.status(500).send("Error while searching donor");
    }

});


app.delete("/donor/:id", async (req, res) => {

    try {
        let donor = await Donor.findOneAndDelete({ donorId: req.params.id });

        if (!donor) {
            return res.status(404).send("Donor not found");
        }

        res.send("Donor deleted successfully");
    }
    catch (err) {
        res.status(500).send("Error while deleting donor");
    }

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});