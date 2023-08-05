var express = require("express");
var router = express.Router();
var principalModel = require("../../models/principalModel");

router.get("/", async (req, res, next) => {
    var novedadesPrincipal = await principalModel.getPrincipal();
    res.render("admin/novedadesPrincipal", {
        layout: "admin/layout",
        persona: req.session.nombre,
        novedadesPrincipal,
    });
});
router.get("/eliminar/:id", async (req, res, next) => {
    const id = req.params.id;
    await principalModel.deleteNovedadesById(id);
    res.redirect("/admin/novedadesPrincipal");
});

router.get("/agregar", (req, res, next) => {
    res.render("admin/agregarPrincipal", {
        layout: "admin/layout",
    });
});

router.post("/agregar", async (req, res, next) => {
    try {
        if (req.body.titulo != "" && req.body.descripcion != "") {
            await principalModel.insertNovedad(req.body);
            res.redirect("/admin/novedadesPrincipal");
        } else {
            res.render("admin/agregarPrincipal", {
                layout: "admin/layout",
                error: true,
                message: "Todos los campos son obligatorios",
            });
        }
    } catch (error) {
        console.log(error);
        res.render("admin/agregarPrincipal", {
            layout: admin / layout,
            error: true,
            message: "No se pudo cargar los datos",
        });
    }
});

router.get("/modificar/:id", async (req, res, next) => {
    var id = req.params.id;
    var novedad = await principalModel.getNovedadesById(id);
    res.render("admin/modificarPrincipal", {
        layout: "admin/layout",
        novedad,
    });
});

router.post("/modificar", async (req, res, next) => {
    try {
        var obj = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
        };
        console.log(obj);
        console.log(req.body.id);
        await principalModel.modificarNovedadById(obj, req.body.id);
        res.redirect("/admin/novedadesPrincipal");
    } catch (error) {
        console.log(error);
        res.render("admin/modificarPrincipal", {
            layout: "admin/layout",
            error: true,
            message: "No se pudo modificar Novedad",
        });
    }
});

module.exports = router;
