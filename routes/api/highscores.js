const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Highscore = require("../../models/Highscore");

router.post("/postScore", (req,res) => {
    const newHighscore = new Highscore({
        User: req.body.userName,
        points: req.body.scoreData
    });

    newHighscore
                .save()
                .then(highscore => res.json(highscore))
                .catch(err => console.log(err));
});

router.get("/getScores", (req,res) => {
    Highscore.find({}).then(highscores => {
      res.send(highscores);
    });
});

module.exports = router;