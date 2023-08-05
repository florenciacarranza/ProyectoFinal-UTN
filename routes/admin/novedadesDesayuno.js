var express = require('express');
var router = express.Router();
var desayunoModel = require('../../models/desayunoModel')

router.get('/', async (req, res, next) => {
    var novedadesDesayuno = await desayunoModel.getDesayuno();

    res.render('admin/novedadesDesayuno', {
        layout: 'admin/layout',
        persona: req.session.nombre,
        novedadesDesayuno
    });
});


router.get('/eliminar/:id', async (req, res, next) => {
    const id = req.params.id;
    await desayunoModel.deleteNovedadesById(id)
    res.redirect('/admin/novedadesDesayuno')
})

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregarDesayuno', {
        layout: 'admin/layout'
    });
});

router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.titulo != "" && req.body.descripcion != "") {
            await desayunoModel.insertNovedad(req.body);
            res.redirect('/admin/novedadesDesayuno');
        } else {
            res.render('admin/agregarDesayuno', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son obligatorios'
            })
        }
    } catch (error) {
        console.log(error);
        res.render('admin/agregarDesayuno', {
            layout: admin / layout,
            error: true,
            message: "No se pudo cargar los datos"
        })
    }
})

router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var novedad = await desayunoModel.getNovedadesById(id);
    res.render('admin/modificarDesayuno', {
        layout: 'admin/layout',
        novedad
    })
})
router.post('/modificar', async (req, res, next) => {
    try {
        var obj = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion
        };
        console.log(obj);
        await desayunoModel.modificarNovedadById(obj, req.body.id);
        res.redirect('/admin/novedadesDesayuno');
    } catch (error) {
        console.error(error);
        res.render('admin/modificarDesayuno', {
            layout: 'admin/layout',
            error: true,
            message: 'No se pudo modificar Novedad'
        })
    }
})

module.exports = router;