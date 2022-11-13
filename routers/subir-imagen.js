const { Router } = require("express");
const { subirImagen } = require("../controllers/uploads");
const expressfileUpload = require('express-fileupload');
const { validarimagen } = require("../middlewares/validar-archivo");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { tieneRole } = require("../middlewares/validar-roles");

const router = Router()
router.use(expressfileUpload( {
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
router.post('/:tipo/:id',[
  validarJWT,
  tieneRole('ADMIN_ROL','USER_ROL'),
  validarimagen,

  validarCampos
],subirImagen)
router.post('/googleDrive')

module.exports=router
