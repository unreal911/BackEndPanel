
const mongoose = require('mongoose');
const mongoConfig = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN);
        console.log('Se conecto a la base de datos')
    } catch (error) {
        throw new Error('Hubo un error al conectarse')
    }
}
module.exports = {
    mongoConfig
}