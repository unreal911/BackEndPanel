const { Router } = require("express");
const { subirImagen } = require("../controllers/uploads");
const { upload } = require('../middlewares/subir-imagen');
const router = Router()
router.post('/',[
    upload
],subirImagen)

module.exports=router
