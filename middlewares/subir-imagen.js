
const { v4: uuidv4 } = require('uuid');

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require('multer');
cloudinary.config({
    cloud_name: "dxku7espu",
    api_key: "258839338232631",
    api_secret: "5tm-zdJkDvYcxWsv1wKdmCNAuoA",
});

const storage = new CloudinaryStorage({//hacer dinamico el folder de guardado
    cloudinary: cloudinary,
    params: {
        folder: "DEV"
    }
});

/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '.' + file.mimetype.split('/')[1])
    },
})*/
const upload = multer({ storage: storage }).array('img')

module.exports = {
    upload
}