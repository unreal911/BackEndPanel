const express = require('express')
const cors = require('cors')
const { mongoConfig } = require('../database/config')
class Server {
    constructor() {
        this.app = express()
        this.PORT = process.env.PORT,
            this.rutas = {
                usuario: '/api/usuario',
                auth:'/api/auth',
                categoria:'/api/categoria',
                uploads:'/api/uploads'
            }
            this.middlewares()
            this.routes()
            this.conectar_mongo()
    }
    async conectar_mongo(){
        await mongoConfig()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
    }
    routes() {

        this.app.use(this.rutas.usuario, require('../routers/usuario'))
        this.app.use(this.rutas.auth,require('../routers/auth'))
        this.app.use(this.rutas.categoria,require('../routers/categoria'))
        this.app.use(this.rutas.uploads,require('../routers/subir-imagen'))
    }
    listen() {

        this.app.listen(this.PORT, () => console.log(`Example app listening on port ${this.PORT}!`))
    }
}
module.exports = {
    Server
}