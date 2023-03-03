const router = require("express").Router();
const clientSchema = require("../models/clientSchema");

router.get("/", async (req, res) => {
  try {
    const client = await clientSchema.find();
    res.status(200).json(client);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const client = await clientSchema.findById(req.params.id);
    res.status(200).json(client);
  } catch(err) {
    res.status(500).json(err);
  }
});
router.post("/", async (req, res) => {
  const client = new clientSchema(req.body);
  try {
    const savedclient = await client.save();
    res.status(200).json(savedclient);
  } catch (err){
    res.status(500).json(err);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const client = await clientSchema.findById(req.params.id);
    await client.updateOne({ $set: req.body });
  } catch (err){
    res.status(500).json(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const client = await clientSchema.findById(req.params.id);
    await client.deleteOne();
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get("/search", async (req, res) => {
  try {
    const { keyword } = req.query;
    const result = await clientSchema.find({
      $or: [
        { name: new RegExp(keyword, 'i') },
        { city: new RegExp(keyword, 'i') },
        { country: new RegExp(keyword, 'i') },
        { gender: new RegExp(keyword, 'i') },
        { number: new RegExp(keyword, 'i') },
        { project: new RegExp(keyword, 'i') },
        { projectDeliverDate: new RegExp(keyword, 'i') },
        { agency: new RegExp(keyword, 'i') },
        { dob: new RegExp(keyword, 'i') },
        { language: new RegExp(keyword, 'i') },
    ]
    });
    res.status(200).json(result);
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;
