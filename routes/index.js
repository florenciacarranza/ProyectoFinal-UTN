var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async (req, res, next) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const email = req.body.email;
  const comentario = req.body.comentario;

  const obj = {
    to: 'florenciacarranza97@getMaxListeners.com',
    subject: 'contacto desde la web',
    html: `${nombre} ${apellido} se contacto y quiere mas informacion a este correo:${email}.<br> Ademas hizo el siguiente comentario: ${comentario}.`
  };

  const transporter = nodemailer.createTransport({
    host: process.env.SHTP_HOST,
    port: process.env.SHTP_PORT,
    auth: {
      user: process.env.SHTP_USER,
      pass: process.env.SHTP_PASS
    }



  });

  const info = await transporter.sendMail(obj);

  res.render('index', { message: "Mensaje enviado correctamente." })
})

module.exports = router;
