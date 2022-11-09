const express = require("express");
const Model = require("../model/model.js");

const routes = express.Router();

//Post
routes.post("/post", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    email: req.body.email,
    dob: req.body.dob,
    occupation: req.body.occupation,
    status: req.body.status,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all
routes.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID
routes.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by email
routes.patch("/update/:email", async (req, res) => {
  try {
    const email = { email: req.params.email };
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findOneAndUpdate(email, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Soft Delete
routes.patch("/softDelete/:email", async (req, res) => {
  try {
    const email = { email: req.params.email };
    const updatedData = { status: false };
    const options = { new: true };

    const result = await Model.findOneAndUpdate(email, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
routes.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = routes;
