const { Router } = require("express");
const { check } = require("express-validator");
const { MostrarUsuarios, CrearUsuario, updateUsuario, EliminarUsuario, EstadoUsuario } = require("../controllers/usuarios");
const { usuarioxid } = require("../controllers/usuarios");
const { existeModelo } = require("../helpers/validarModelo");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole, EsusuarioAdmin } = require("../middlewares/validar-roles");
const { validarCampos } = require("../middlewares/validar-campos");
const Usuario = require("../models/usuarios");
const router = Router();
router.get('/', [
    validarJWT,
    esAdminRole,

    validarCampos
],
    MostrarUsuarios)

router.get('/:id', [
    validarJWT,
    EsusuarioAdmin,
    check('id','No es un id valido').isMongoId(),
    check('id','no se encontro un id valido').notEmpty()
],
    usuarioxid)

router.post('/', [
    check('email', 'El correo debe ser obligatorio').notEmpty(),
    check('password', 'el password es obligatorio').notEmpty(),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('email').custom((email) => (existeModelo(email, 'email', Usuario))),
    validarCampos
],
    CrearUsuario)

router.put('/:id', [
    validarJWT,
    EsusuarioAdmin,
    check('id','El id es necesario').notEmpty(),
    check('id','No es valido').isMongoId(),
    check('email').custom((email) => (existeModelo(email, 'email', Usuario))),
    validarCampos
],
    updateUsuario)

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id','El id es necesario').notEmpty(),
    check('id','No es valido').isMongoId(),
    validarCampos
],
    EliminarUsuario)

router.put('/estado/:id', [
    validarJWT,
    esAdminRole,
    check('id','El id es necesario').notEmpty(),
    check('id','No es valido').isMongoId(),

validarCampos
],
    EstadoUsuario)

module.exports = router