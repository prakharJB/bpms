const router = require("express").Router();
const portfolioModel = require("../models/portfolioSchema");

router.get("/", async (req, res) => {
 
  try {
    const portfolio = await portfolioModel.find();
    res.status(200).json(portfolio);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const portfolio = await portfolioModel.findById(req.params.id);
    res.status(200).json(portfolio);
  } catch (err){
    res.status(500).json(err);
  }
});
router.post("/", async (req, res) => {
  try {
  const newportfolio = new portfolioModel(req.body);
    const savedCourse = await newportfolio.save();
    res.status(200).json(savedCourse);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const portfolio = await portfolioModel.findById(req.params.id);
    await portfolio.updateOne({ $set: req.body });
  } catch (err){
    res.status(500).json(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const portfolio = await portfolioModel.findById(req.params.id);
    await portfolio.deleteOne();
  } catch(err){
    res.status(500).json(err);
  }
});

router.get("/search", async (req, res) => {
  try {
    console.log(req.query)
    const { keyword } = req.query;
    const result = await portfolioModel.find({
      $or: [
        { title: new RegExp(keyword, 'i') },
        { feature: new RegExp(keyword, 'i') },
        { technology: new RegExp(keyword, 'i') },
        { theme: new RegExp(keyword, 'i') },
        { plugin: new RegExp(keyword, 'i') },
        { client: new RegExp(keyword, 'i') },
        { cms: new RegExp(keyword, 'i') },
        { domainName: new RegExp(keyword, 'i') },
        { natureOfbusiness: new RegExp(keyword, 'i') },
        { languageOfwebsite: new RegExp(keyword, 'i') },
        { link: new RegExp(keyword, 'i') },
    ]
    });
    res.status(200).json(result);
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;

// {
//   "username":"username",
//   "firstName":"firstName",
//   "lastName":"lastName",
//   "email":"jmbliss46@gmail.com",
//   "password":"1998@Prakhar"
// }