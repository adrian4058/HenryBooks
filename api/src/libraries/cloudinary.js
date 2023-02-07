const cloudinary = require('cloudinary').v2;
//conexion a coludinary
cloudinary.config({
    cloud_name: "santiagocanal",
    api_key: "626361669696184",
    api_secret: "DSP7M2QLSHyFFn-fcXa6DlSApSE"
});
const uploadImage=async filePath=>{
    return await cloudinary.uploader.upload(filePath,{
        folder:'Libros'
    })
}

const uploadImageUser =async filePath=>{
    return await cloudinary.uploader.upload(filePath,{
        folder:'usuarios'
    })
}


module.exports={
    uploadImage,
    uploadImageUser
}