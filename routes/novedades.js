var express = require("express");
var router = express.Router();
var principalModel = require("../models/principalModel");
var postresModel = require("../models/postresModel");
var desayuModel = require("../models/desayunoModel");
var cloudinary = require('cloudinary').v2;

router.get("/", async function (req, res, next) {
  var principalNovedades = await principalModel.getPrincipal();
  var postresNovedades = await postresModel.getPostres();
  var desayunoNovedades = await desayuModel.getDesayuno();

  principalNovedades = principalNovedades.splice(0, 5);
  postresNovedades = postresNovedades.splice(0, 5);
  desayunoNovedades = desayunoNovedades.splice(0, 5);

  principalNovedades = principalNovedades.map(novedad => {
    if (novedad.img_id) {
      const imagen = cloudinary.url(novedad.img_id, {
        width: 1250,
        crop: 'fill'
      })
      return {
        ...novedad,
        imagen
      }
    } else {
      return {
        ...novedad,
        imagen: '/images/noimagen.jpg'
      }
    }
  })
  postresNovedades = postresNovedades.map(novedad => {
    if (novedad.img_id) {
      const imagen = cloudinary.url(novedad.img_id, {
        width: 460,
        crop: 'fill'
      })
      return {
        ...novedad,
        imagen
      }
    } else {
      return {
        ...novedad,
        imagen: '/images/noimagen.jpg'
      }
    }
  })
  desayunoNovedades = desayunoNovedades.map(novedad => {
    if (novedad.img_id) {
      const imagen = cloudinary.url(novedad.img_id, {
        width: 450,
        crop: 'fill'
      })
      return {
        ...novedad,
        imagen
      }
    } else {
      return {
        ...novedad,
        imagen: '/images/noimagen.jpg'
      }
    }
  })
  res.render("novedades", {
    title: "Novedades",
    principalNovedades,
    postresNovedades,
    desayunoNovedades,
  });
});

module.exports = router;
