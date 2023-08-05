var express = require('express');
var router = express.Router();
var postresModel = require('../../models/postresModel')

router.get('/', async (req, res, next) => {
    var novedadesPostres = await postresModel.getPostres();
    res.render('admin/novedadesPostres', {
        layout: 'admin/layout',
        persona: req.session.nombre,
        novedadesPostres
    });
});
router.get('/eliminar/:id', async (req, res, next) => {
    const id = req.params.id;
    await postresModel.deleteNovedadesById(id)
    res.redirect('/admin/novedadesPostres')
})

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregarPostres', {
        layout: 'admin/layout'
    });
});

router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.titulo != "" && req.body.descripcion != "") {
            await postresModel.insertNovedad(req.body);
            res.redirect('/admin/novedadesPostres');
        } else {
            res.render('admin/agregarPostres', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son obligatorios'
            })
        }
    } catch (error) {
        console.log(error);
        res.render('admin/agregarPostres', {
            layout: admin / layout,
            error: true,
            message: "No se pudo cargar los datos"
        })
    }
})

router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var novedad = await postresModel.getNovedadesById(id);
    res.render('admin/modificarPostres', {
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
        await postresModel.modificarNovedadById(obj, req.body.id);
        res.redirect('/admin/novedadesPostres');
    } catch (error) {
        console.error(error);
        res.render('admin/modificarPostres', {
            layout: 'admin/layout',
            error: true,
            message: 'No se pudo modificar Novedad'
        })
    }
})


module.exports = router;