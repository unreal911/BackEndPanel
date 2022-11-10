const { response, request } = require("express");
const { AEstado, BusquedaID, Crear, Actualizar, eliminar } = require("../helpers/crud");
const bcryptjs = require('bcryptjs');
const Modelo = require("../models/usuarios");
const CrearUsuario = (req = request, res = response) => {
    const { estado, rol, password, ...newBody } = req.body;
    const salt = bcryptjs.genSaltSync();
    pwsecrp = bcryptjs.hashSync(password, salt);
    newBody.password = pwsecrp
    Crear(Modelo, res, newBody,)
}
const usuarioxid = (req = request, res = response) => {
    const id = req.params.id
    BusquedaID(id, Modelo, res)
}
const updateUsuario = (req = request, res = response) => {
    const id = req.params.id
    const { estado, password, rol, ...newBody } = req.body
    if (password) {
        const salt = bcryptjs.genSaltSync();
        pwsecrp = bcryptjs.hashSync(password, salt);
        newBody.password = pwsecrp
    }

    Actualizar(Modelo, res, newBody, id)
}
const EstadoUsuario = (req = request, res = response) => {
    const idModelo = req.params.id
    const { estado } = req.body
    AEstado(idModelo, estado, Modelo, res)
}
const EliminarUsuario = (req = request, res = response) => {
    const idModelo = req.params.id
    eliminar(idModelo, Modelo, res)
}
const MostrarUsuarios = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const [total, Modelos] = await Promise.all([
        Modelo.countDocuments(),
        Modelo.find()
            .skip(Number(desde))
            .limit(Number(limite)),
    ])
    res.json({
        ok: true,
        msg: 'Lista de Usuarios',
        Usuarios: Modelos,
        total
    })
}
module.exports = {
    CrearUsuario,
    updateUsuario,
    EstadoUsuario,
    EliminarUsuario,
    MostrarUsuarios,
    usuarioxid
}