const textservice = require("../service/textservice");

async function createText(req, res) {
  req.body.text = "HELLO WORLD";
  try {
    const newtext = await textservice.createText(req.body);
    res.sendStatus(201).json(newtext);
  } catch (error) {
    res.sendStatus(404).json("Error creating text");
  }
}

async function getOneText(req, res) {
  try {
    const texts = await textservice.getOneText();
    res.status(200).json(texts);
  } catch (error) {
    res.status(404).json("Error getting all text");
  }
}

module.exports = { createText, getOneText };
