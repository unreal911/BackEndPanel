const { request, response } = require("express")
const {google} = require('googleapis');
const verFotos = (req=request,res=response)=>{
    return res.json({
        ok:true,
        msg:`Estas en el google photos`
    })
}
module.exports={
    verFotos
}