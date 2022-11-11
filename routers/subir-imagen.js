const { Router } = require("express");
const { subirImagen } = require("../controllers/uploads");
const expressfileUpload = require('express-fileupload');
const { validarimagen } = require("../middlewares/validar-archivo");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router()
router.use(expressfileUpload( {
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
router.post('/:tipo/:id',[
  validarimagen,
  validarCampos
],subirImagen)

module.exports=router
