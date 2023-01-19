const { DataTypes }=require("sequelize"); 

module.exports= sequelize=>{
    sequelize.define('Usuario',{
        nombre:{
            type:DataTypes.STRING,
            unique:true,
            allownull:false
        },
        email:{
            type:DataTypes.STRING,
            unique:true,
            allownull:false
        },
        clave:{
            type:DataTypes.STRING,
            allownull:false
        },
        rol:{
            type:DataTypes.ENUM('user','admin'),
            allownull:false
        },
        estado:{
            type:DataTypes.ENUM('activo','desactivado'),
            allownull:false
        }
    })
}

