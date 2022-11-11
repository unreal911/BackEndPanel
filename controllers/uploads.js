
const { request, response } = require("express");
const usuarios = require("../models/usuarios");
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: "dxku7espu",
    api_key: "258839338232631",
    api_secret: "5tm-zdJkDvYcxWsv1wKdmCNAuoA",
});
const subirImagen = async (req = request, res = response) => {
    const { tipo, id } = req.params
    console.log(tipo)
    switch (tipo) {
        case 'usuarios':
            /*    const UsuarioModel = await usuarios.findById(id)
                console.log(UsuarioModel.img)*/
            const usuariodb = await usuarios.findById(id)
            const cloudy = await cloudinary.uploader.destroy(usuariodb.img.id)
            const { public_id, secure_url, original_filename } = await cloudinary.uploader.upload(req.files.img.tempFilePath, { folder: tipo })

            usuariodb.img = {
                id: public_id,
                url: secure_url,
                original_filename
            }
            usuariodb.save()

            res.json({
                usuariodb,
                cloudy
            })
            /*  UsuarioModel.img = {img:'asdasda'}
              UsuarioModel.save()*/
            break;

        default:
            break;
    }
}
module.exports = {
    subirImagen
}