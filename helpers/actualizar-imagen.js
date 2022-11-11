const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: "dxku7espu",
    api_key: "258839338232631",
    api_secret: "5tm-zdJkDvYcxWsv1wKdmCNAuoA",
});
const actualizarImagenCloudinary = async (usuarios, tipo, id,tempFilePath,res) => {
    const Modelo = await usuarios.findById(id)
    if (!Modelo) {
        return res.status(403).json({
            ok: false,
            msg: `usuario no encontrado en la coleccion`
        })
    }
    const cloudy = await cloudinary.uploader.destroy(Modelo.img.id)
    const { public_id, secure_url, original_filename } = await cloudinary.uploader.upload(tempFilePath, { folder: tipo })
    Modelo.img = {
        id: public_id,
        url: secure_url,
        original_filename
    }
    Modelo.save()
    res.json({
        Modelo,
        cloudy
    })
}
module.exports = {
    actualizarImagenCloudinary
}