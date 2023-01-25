const { DataTypes }=require("sequelize"); 

module.exports= sequelize=>{
    sequelize.define('Usuario',{
        name:{
            type:DataTypes.STRING,
            unique:true,
            allownull:false
        },
        lastname:{
            type:DataTypes.STRING,
            unique:true,
            allownull:false
        },
        email:{
            type:DataTypes.STRING,
            unique:true,
            allownull:false
        },
        password:{
            type:DataTypes.STRING,
            allownull:false 
        },
        rol:{
            type:DataTypes.ENUM('user','admin'),
            allownull:false
        },
        estado:{
            type:DataTypes.ENUM('activo','desactivado'),
            allownull:false,
            defaultValue:'activo'
        }
    })
}

