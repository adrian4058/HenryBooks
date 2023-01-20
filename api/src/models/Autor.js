const { DataTypes }=require ("sequelize"); 

module.exports= sequelize=>{
    sequelize.define('Autor',{
        nombre:{
            type:DataTypes.STRING,
            unique:true,
            allownull:false
        },
        estado:{
            type:DataTypes.ENUM('activo','desactivado'),
            allownull:false,
            defaultValue:'activo'
        }
    })
}
