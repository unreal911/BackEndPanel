const { Router } = require("express");
const { verFotos } = require("../controllers/googlePhotos");
const router = Router()
router.get('/',[],verFotos)
module.exports=router