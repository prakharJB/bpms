const router = require("express").Router();
const clientSchema = require("../models/clientSchema");

router.get("/", async (req, res) => {
  try {
    const client = await clientSchema.find().sort({ updatedAt: -1 }).lean();
    if (client == "") {
      res.status(200).json("no data found");
    } else {
      res.status(200).json(client);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

router.get("/:id", async (req, res) => {
  try {
    const client = await clientSchema.findById(req.params.id);
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/", async (req, res) => {
  const client = new clientSchema(req.body);
  try {
    const savedclient = await client.save();
    res.status(200).json(savedclient);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const client = await clientSchema.findById(req.params.id);
    await client.updateOne({ $set: req.body });
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const client = await clientSchema.findById(req.params.id);
    await client.deleteOne();
    res.status(200).json("data deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/search/:key", async (req, res) => {
  try {
    const result = await clientSchema.find({
      $or: [
        { name: { $regex: req.params.key } },
        { salutation: { $regex: req.params.key } },
        { email: { $regex: req.params.key } },
        { city: { $regex: req.params.key } },
        { country: { $regex: req.params.key } },
        { gender: { $regex: req.params.key } },
        { number: { $regex: req.params.key } },
        { project: { $regex: req.params.key } },
        { projectDeliverDate: { $regex: req.params.key } },
        { agency: { $regex: req.params.key } },
        { dob: { $regex: req.params.key } },
        { language: { $regex: req.params.key } },
      ],
    });
    if (result == "") {
      res.status(200).json("no data found");
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
