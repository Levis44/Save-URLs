const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
// const bodyParser = require("body-parser");
const links = require("../model/links.json");
const urls = links.urls;
// const cors = require('cors');

router.get("/", (req, res, next) => {
    res.json(JSON.stringify(urls));
}) 

router.post("/new", bodyParser.json(), (req, res) => {
    let name = req.body.name;
    let url = req.body.url;
    let id = req.body.id;
    urls.push({id, name, url});

    res.send("Post Adicionado!")
})

router.delete("/delete", bodyParser.json(), (req, res) => {
    let position = req.body.position;
    console.log(position);
    urls.splice(position, 1);
    res.send("Post removido!")

})

module.exports = router;