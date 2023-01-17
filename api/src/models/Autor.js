const { DataTypes }=require ("sequelize"); 

module.exports= sequelize=>{
    sequelize.define('Autor',{
        nombre:{
            type:DataTypes.STRING,
            unique:true,
            allownull:false
        },
        fechaNacimiento:{
            type:DataTypes.DATEONLY,
            allownull:false
        },
        lugar_nacimiento:{
            type:DataTypes.STRING,
            allownull:false
        },
    })
}

