const { request, response } = require("express")

const subirImagen= ( req=request,res=response)=>{
    const multer = req.files
    res.json({
        ok:true,
        msg:`archivo subido`,
        multer
    })
}
module.exports={
    subirImagen
}