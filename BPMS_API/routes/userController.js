const User = require("../models/userSchema");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Update user
router.put("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,
            { $set: req.body });
        res.status(200).json("Account has been updated.")
    } catch (err) {
        return res.status(500).json(err);
    }
});


// Delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted.")
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can only delete your own account.")
    }
});

// Get a user (without getting the password)
router.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc
        res.status(200).json(other)
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a user's id by email
router.get("/email/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        const userId = user._id
        res.status(200).json(userId)
    } catch (err) {
        res.status(500).json(err);
    }
});


// Get all users
router.get("/", async (req, res) => {
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers);
    } catch {
        res.status(500).json(err);
    }
})

// Update last active
router.put("/lastActive/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        await user.updateOne({ $set: req.body });
        res.status(200).json("Account has been updated.")
    } catch (err) {
        return res.status(500).json(err);
    }
})


module.exports = router