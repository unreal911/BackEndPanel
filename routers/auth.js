const { Router } = require("express");
const { check } = require("express-validator");
const { login, renovarToken } = require("../controllers/login");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();
router.post('/', [
    check('email', 'El correo es obligatorio').notEmpty(),
    check('email', 'correo no valido').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    validarCampos
],
    login)
router.post('/renovarToken', [],
    renovarToken
)
module.exports = router