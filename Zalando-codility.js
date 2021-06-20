"use strict";

const express = require("express");
const app = express();
app.use(express.json());

// Your code starts here. Placeholders for .get and .post are provided for
//  your convenience.

const candidates = {};

app.post("/candidates", function (req, res) {
  const candidate = req.body;
  if (!candidate) {
    res.sendStatus(400);
  } else {
    candidates[candidate.id] = candidate;
    res.sendStatus(200);
  }
});

app.get("/candidates/search", function (req, res) {
  let requiredSkills = req.query.skills;
  if (!requiredSkills) {
    res.sendStatus(400);
  }
  let foundCandidate;
  let maxFoundSkillsCount = 0;

  if (Object.keys(candidates).length > 0) {
    requiredSkills = requiredSkills.split(",");
    Object.values(candidates).forEach((value) => {
      const { skills } = value;
      const foundSkillsCount = requiredSkills.filter((s) =>
        skills.includes(s)
      ).length;
      if (foundSkillsCount > maxFoundSkillsCount) {
        maxFoundSkillsCount = foundSkillsCount;
        foundCandidate = value;
      }
    });
  }

  if (foundCandidate) {
    res.status(200).send(foundCandidate);
  } else {
    res.sendStatus(404);
  }
});

app.listen(process.env.HTTP_PORT || 3000);
