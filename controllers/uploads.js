
const { request, response } = require("express");
const { actualizarImagenCloudinary } = require("../helpers/actualizar-imagen");
const categoria = require("../models/categoria");
const usuarios = require("../models/usuarios");
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: "dxku7espu",
    api_key: "258839338232631",
    api_secret: "5tm-zdJkDvYcxWsv1wKdmCNAuoA",
});
const subirImagen = async (req = request, res = response) => {
    const { tipo, id } = req.params
    const { tempFilePath } = req.files.img
    console.log(tipo)
    switch (tipo) {
        case 'usuarios':
            await actualizarImagenCloudinary(usuarios, tipo, id, tempFilePath, res)
            break;
        case 'categorias':
            await actualizarImagenCloudinary(categoria, tipo, id, tempFilePath, res)
        default:
            break;
    }
}
module.exports = {
    subirImagen
}