const { Schema, model } = require('mongoose');

const categoriaSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    img: {
        type: Object,
        default: {
            id:'NoImage',
            url:'NoUrl',
            originalName:'NoName'
        }
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        default:'Sin usuario'
    }
})
module.exports = model('Categoria', categoriaSchema)