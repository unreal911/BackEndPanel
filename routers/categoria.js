const { Router } = require("express");
const { check } = require("express-validator");
const { MostrarCategorias, CrearCategoria, updateCategoria, EliminarCategoria, EstadoCategoria, categoriaxid } = require("../controllers/categoria");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { tieneRole } = require("../middlewares/validar-roles");
const router = Router();
router.get('/', [
    validarJWT,
    tieneRole('ADMIN_ROL','USER_ROL'),
    validarCampos
    //falta categorias
],
    MostrarCategorias)
router.get('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROL','USER_ROL'),
], categoriaxid)
router.post('/', [
    validarJWT,
    tieneRole('ADMIN_ROL','USER_ROL'),
],
    CrearCategoria)

router.put('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROL','USER_ROL'),
],
    updateCategoria)

router.delete('/', [
    validarJWT,
    tieneRole('ADMIN_ROL','USER_ROL'),
],
    EliminarCategoria)

router.put('/estado/:id', [
    validarJWT,
    tieneRole('ADMIN_ROL','USER_ROL'),
],
    EstadoCategoria)

module.exports = router