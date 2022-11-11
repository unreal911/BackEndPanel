const { request, response } = require("express");

const validarimagen = (req=request,res=response,next)=>{
    const tipo = req.params.tipo
    const id = req.params.id
    const colecciones = ['usuarios', 'categorias']
    if (!colecciones.includes(tipo)) {
        return res.status(403).json({
            ok: false,
            mgs: `${tipo} no esta incluido en las colecciones permitidas`
        })
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'no hay ningun archivo'
        })
    }
    const file = req.files.img;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    const extensionesValida = ['png', 'jpg', 'jpeg', 'gif', 'PNG', 'JPG', 'JPEG', 'GIF'];
    if (!extensionesValida.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }
    next()
}
module.exports={
    validarimagen
}