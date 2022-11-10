const Crear = async (Modelo, res, resto) => {
    const crear = new Modelo(resto)
    await crear.save()
    res.json({
        ok: true,
        msg: 'Creacion existosa',
        crear
    })
}
const Actualizar = async (Modelo, res, resto, id) => {
    const actualizar = await Modelo.findByIdAndUpdate(id, resto, { new: true })
    if (!actualizar) {
        res.status(404).json({
            ok: false,
            msg: 'Se el id no se encontro',
         //   ConsultaUpdate
        })
    }
    res.json({
        ok: true,
        msg: 'se guardaron los datos correctamente',
        actualizar
    })
}
const Paginar = async (Modelo, res, limite, desde, usuariologin) => {
    const [respuesta, total] = await Promise.all([
        Modelo.find().skip(Number(desde)).limit(Number(limite)),
        Modelo.countDocuments()
    ])

    if (!respuesta) {
        res.status(404).json({
            ok: false,
            msg: 'hubo un problema con la consulta'
        })
    }
    res.json({
        respuesta,
        total,
        usuariologin
    })
}
const AEstado = async (id, estado, Modelo, res) => {
    if (estado == "true") {
        const ModeloDB = await Modelo.findByIdAndUpdate(id, { estado: true }, { new: true })
        res.json({
            ok: false,
            msg: `Empresa en estado : ${estado}`,
            Resultados: ModeloDB
        })
    } else if (estado == "false") {
        const ModeloDB = await Modelo.findByIdAndUpdate(id, { estado: false }, { new: true })
        res.json({
            ok: false,
            msg: `Empresa en estado : ${estado}`,
            Resultados: ModeloDB
        })
    } else {
        res.status(403).json({
            ok: false,
            msg: 'valor no permitido'
        })
    }
}
const eliminar = async (id, Modelo, res) => {
    const ModeloDB = await Modelo.findByIdAndDelete(id)
    if (!ModeloDB) {
        return res.status(404).json({
            ok: false,
            msg: 'No se encontro la peticion de eliminacion'
        })
    }
    res.json({
        ok: false,
        msg: 'Se elimino de la base de datos'
    })
}
const BusquedaID = async (id, Modelo, res) => {
    const ModeloDB = await Modelo.findById(id)
    if (!ModeloDB) {
        return res.status(404).json({
            ok: false,
            msg: 'No se encontro la peticion '
        })
    }
    res.json({
        ok: false,
        msg: 'Empresa encontrada',
        Resultado: ModeloDB
    })
}
module.exports={
    Crear,
    Actualizar,
    Paginar,
    AEstado,
    eliminar,
    BusquedaID
}