const jwt = require('jsonwebtoken')
const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {

        const payload = { uid };
        jwt.sign(payload, process.env.SECRETJWTKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar le token')
            } else {
                resolve(token)
            }
        })

    })
}
module.exports = {
    generarJWT
}