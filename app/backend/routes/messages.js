const express = require("express");
const { check, validationResult } = require("express-validator");
const authentification = require("../middlewares/authentification");
const admin = require("../middlewares/admin");
const router = express.Router();
const Message = require("../Models/message");

// @route    GET annonces/
// @desc     get pubs
// @access   Public
router.get("/", async (req, res) => {
  try {
    const messages = req.query.text
      ? await Message.find({ text: req.query.text })
      : req.query.text
      ? await Message.find({
          $and: [{ text: req.query.text }]
        }).populate("user", "-password")
      : req.query.text
      ? await Message.find({
          text: req.query.text
        }).populate("user", "-password")
      : await Message.find().populate("user", "-password");

    if (!messages) return res.status(404).send({ msg: "There are no ads yet" });

    return res.send(messages);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
// router.get("/", async (req, res) => {
//   try {
//     const messages = req.query.user_id
//       ? await Message.find({ name: req.query.name })
//       : req.query.text
//       ? await Message.find({ phone: req.query.phone }).populate(
//           "user",
//           "-password"
//         )
//       : req.query.text
//       ? await Message.find({
//           text: req.query.text
//         }).populate("user", "-password")
//       : await Message.find().populate("user", "-password");

//     if (!messages)
//       return res.status(404).send({ msg: "There are no message yet" });

//     return res.send(messages);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server error");
//   }
// });

// @route    GET annonces/:id
// @desc     get an ad
// @access   Public i guess
router.get("/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).populate(
      "user",
      "-password"
    );

    if (!message)
      return res
        .status(404)
        .send({ msg: "The ad with the given ID was not found." });

    return res.send(message);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route    POST annonces/
// @desc     add an ad
// @access   Private
router.post(
  "/",

  [
    check("name", "please enter your name")
      .not()
      .isEmpty(),
    check("phone", "please enter your phone number")
      .not()
      .isEmpty(),
    check("text", "please enter your message text")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const { name, phone, text } = req.body;
      const message = new Message({
        name,
        phone,
        text
      });
      message.save();
      res.status(201).send(message);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    DELETE annonces/:id
// @desc     delete an ad
// @access   Private
router.delete("/:id", authentification, async (req, res) => {
  try {
    let message = await Message.findById(req.params.id);
    if (!message)
      return res
        .status(404)
        .send({ msg: "The message with the given ID was not found." });
    // if (message.user.toString() !== req.user._id && req.user.role !== "Admin")
    //   return res.status(403).send({ msg: "unauthentification" });
    message = await Message.findByIdAndDelete(req.params.id);
    res.send("message removed");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
