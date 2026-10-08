const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

mongoose.connect("mongodb+srv://kadhithya005_db_user:LTsedemlrnqDib2C@cluster0.mzaqn4k.mongodb.net")
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
        let donor = new Donor(req.body);
        await donor.save();
        res.send("Donor added successfully");
    }
    catch (err) {
        res.status(500).send("Error while adding donor");
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


app.listen(3000, () => {
    console.log("Server running on port 3000");
});