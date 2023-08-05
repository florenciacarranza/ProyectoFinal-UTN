var express = require("express");
var router = express.Router();
var principalModel = require("../models/principalModel");
var postresModel = require("../models/postresModel");
var desayuModel = require("../models/desayunoModel");

router.get("/", async function (req, res, next) {
  var principalNovedades = await principalModel.getPrincipal();
  var postresNovedades = await postresModel.getPostres();
  var desayunoNovedades = await desayuModel.getDesayuno();
  res.render("novedades", {
    title: "Novedades",
    principalNovedades,
    postresNovedades,
    desayunoNovedades,
  });
});

module.exports = router;
