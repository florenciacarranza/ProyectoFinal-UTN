var express = require('express');
var router = express.Router();
var postresModel = require('../../models/postresModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get('/', async (req, res, next) => {
    //var novedadesPostres = await postresModel.getPostres();
    var novedadesPostres
    if(req.query.q === undefined){
        novedadesPostres = await postresModel.getPostres();
    }else{
        novedadesPostres = await postresModel.buscarNovedad(req.query.q);
    }

    novedadesPostres = novedadesPostres.map(novedad => {
        if (novedad.img_id) {
            const imagen = cloudinary.image(novedad.img_id, {
                width: 80,
                height: 80,
                crop: 'fill'
            })
            return {
                ...novedad,
                imagen
            }
        } else {
            return {
                ...novedad,
                imagen: ''
            }
        }
    })
    res.render('admin/novedadesPostres', {
        layout: 'admin/layout',
        persona: req.session.nombre,
        novedadesPostres,
        is_search: req.query.q !== undefined,
        q: req.query.q
    });
});
router.get('/eliminar/:id', async (req, res, next) => {
    const id = req.params.id;
    let novedad = await postresModel.deleteNovedadesById(id)
    if (novedad.img_id) {
        await (destroy(novedad.img_id))
    }
    res.redirect('/admin/novedadesPostres')
})

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregarPostres', {
        layout: 'admin/layout'
    });
});

router.post('/agregar', async (req, res, next) => {
    try {
        var img_id = '';
        if (req.files && Object.keys(req.files).length > 0) {
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        };

        if (req.body.titulo != "" && req.body.descripcion != "") {
            await postresModel.insertNovedad({
                ...req.body,
                img_id
            });

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
        let img_id = req.body.img_original;
        let borrar_img_vieja = false;

        if (req.body.img_delete === '1') {
            img_id = null;
            borrar_img_vieja = true;
        } else {
            if (req.files && Object.keys(req.files).length > 0) {
                imagen = req.files.imagen;
                img_id = (await uploader(imagen.tempFilePath)).public_id;
                borrar_img_vieja = true;
            }
        }
        if (borrar_img_vieja && req.body.img_original) {
            await (destroy(req.body.img_original));
        };
        var obj = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            img_id
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