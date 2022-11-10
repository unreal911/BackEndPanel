const { request, response } = require("express");

const esAdminRole = (req = request, res = response, next) => {
    //el req.usuario esta definido cuando se valida el jwt en el validar-jwt.js

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }
    const { rol, nombre } = req.usuario;
    if (rol !== 'ADMIN_ROL') {
        console.log('mensaje')
        return res.status(401).json({
            msg: `${nombre} no es el administrador -- no puede hacer esto`
        })
    }

    next();

}
const EsusuarioAdmin =( req =request , res=response,next)=>{
    console.log (req.usuario.id)
    const idUrl = req.params.id

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }
    if(req.usuario.rol !="ADMIN_ROL" && req.usuario.id !=idUrl ){
        return res.status(403).json({
            msg:`no estas autorizado para estas accion`
        })
    }
    next()
}

const tieneRole = (...roles) => {

    return (req = request, res = response, next) => {
        //console.log(req.usuario)
        if (!req.usuario) {
            return res.status(500).json({
                ok:false,
                msg: 'se quiere verificar el role sin validar el token primero'
            })
        }
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                ok:false,
                msg: `el servicio requiere unos de estos roles : ${roles}`
            })
        }
        next()

    }

}
module.exports={
    esAdminRole,
    EsusuarioAdmin,
    tieneRole
}