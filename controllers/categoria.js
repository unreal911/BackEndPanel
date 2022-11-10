const { response, request } = require("express");
const { Crear, Actualizar, AEstado, eliminar, BusquedaID } = require("../helpers/crud");
const Modelo = require("../models/categoria");
const CrearCategoria = (req = request, res = response) => {
    const { estado, ...newBody } = req.body;
    newBody.usuario = req.usuario.id
    Crear(Modelo, res,newBody )
}
const updateCategoria = (req = request, res = response) => {
    const id = req.params.id
    const { codigo, ...newBody } = req.body
    newBody.usuario = req.usuario.id //falta hacer pruebas
    Actualizar(id, newBody, Modelo, res)
}
const EstadoCategoria = (req = request, res = response) => {
    const id = req.params.id
    const { estado } = req.body
    newBody.usuario = req.usuario.id
    AEstado(id, estado, Modelo, res)
}
const EliminarCategoria = (req = request, res = response) => {
    const id = req.params.id//probar si necesita el id
    eliminar(id, Modelo, res)
}
const categoriaxid =(req=request,res=response)=>{
    const id = req.params.id 
    BusquedaID(id,Modelo,res)
}
const MostrarCategorias = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const [total, Modelo] = await Promise.all([
        Modelo.countDocuments(),
        Modelo.find()
            .skip(Number(desde))
            .limit(Number(limite)),
    ])
    res.json({
        ok: true,
        msg: 'Lista de Categorias',
        Results: Modelo,
        total
    })
}
module.exports = {
    CrearCategoria,
    updateCategoria,
    EstadoCategoria,
    EliminarCategoria,
    MostrarCategorias,
    categoriaxid
}