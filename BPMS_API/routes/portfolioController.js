const router = require("express").Router();
const portfolioModel = require("../models/portfolioSchema");
const upload = require("../helpers/portfolioImage");
const fs = require("fs");
const path = "http://localhost:8800/portfolioImg/";

router.get("/", async (req, res) => {
  try {
    const portfolio = await portfolioModel
      .find()
      .sort({ updatedAt: -1 })
      .lean();
    if (portfolio == "") {
      res.status(200).json("no data found");
    } else {
      var newresult = [];
      newresult = portfolio.map((x) => {
        x.image = path + x.image;
        x.logo = path + x.logo;
        return x;
      });
      res.status(200).json(newresult);
    }
    // var newresult = [];
    // newresult = portfolio.map((x) => {
    //   x.image = path + x.image;
    //   x.logo = path + x.logo;
    //   return x;
    // });
    // res.status(200).json(newresult);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const portfolio = await portfolioModel.findById(req.params.id);
    res.status(200).json(portfolio);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/", upload, async (req, res) => {
  try {
    var data = JSON.parse(req.body.data);
    const newportfolio = new portfolioModel({
      image: req.files.image[0].filename,
      logo: req.files.logo[0].filename,
      title: data.title,
      feature: data.feature,
      technology: data.technology,
      plugin: data.plugin,
      client: data.client,
      domainName: data.domainName,
      natureOfbusiness: data.natureOfbusiness,
      languageOfwebsite: data.languageOfwebsite,
      theme: data.theme,
      link: data.link,
    });
    const savedCourse = await newportfolio.save();
    res.status(200).json(savedCourse);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", upload, async (req, res) => {
  try {
    let id = req.params.id;
    let new_img = "";
    let new_logo = "";
    var data = JSON.parse(req.body.data);
    var img = data.image;
    var arr = img.split("portfolioImg/");
    var logo = data.logo;
    var arr2 = logo.split("portfolioImg/");
    if (req.files.image) {
      new_img = req.files.image[0].filename;
      try {
        fs.unlinkSync("./public/portfolioImg/" + arr[1]);
      } catch (err) {
        console.log(err);
      }
    } else {
      new_img = arr[1];
    }
    if (req.files.logo) {
      new_logo = req.files.logo[0].filename;
      try {
        fs.unlinkSync("./public/portfolioImg/" + arr2[1]);
      } catch (err) {
        console.log(err);
      }
    } else {
      new_logo = arr2[1];
    }

    const portfolio = await portfolioModel.findByIdAndUpdate(id, {
      image: new_img,
      logo: new_logo,
      title: data.title,
      feature: data.feature,
      technology: data.technology,
      plugin: data.plugin,
      client: data.client,
      domainName: data.domainName,
      natureOfbusiness: data.natureOfbusiness,
      languageOfwebsite: data.languageOfwebsite,
      theme: data.theme,
      link: data.link,
    });
    res.status(200).json(portfolio);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const portfolio = await portfolioModel.findById(req.params.id);
    fs.unlinkSync("./public/portfolioImg/" + portfolio.image);
    fs.unlinkSync("./public/portfolioImg/" + portfolio.logo);
    await portfolio.deleteOne();
    res.status(200).json(portfolio);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/search/:key", async (req, res) => {
  try {
    const result = await portfolioModel.find({
      $or: [
        { title: { $regex: req.params.key } },
        { feature: { $regex: req.params.key } },
        { technology: { $regex: req.params.key } },
        { theme: { $regex: req.params.key } },
        { plugin: { $regex: req.params.key } },
        { client: { $regex: req.params.key } },
        { domainName: { $regex: req.params.key } },
        { natureOfbusiness: { $regex: req.params.key } },
        { languageOfwebsite: { $regex: req.params.key } },
        { link: { $regex: req.params.key } },
      ],
    });
    if (result == "") {
      res.status(200).json("no data found");
    } else {
      var newresult = [];
      newresult = result.map((x) => {
        x.image = path + x.image;
        x.logo = path + x.logo;
        return x;
      });
      res.status(200).json(newresult);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
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
