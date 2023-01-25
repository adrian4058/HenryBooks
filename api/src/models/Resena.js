const { DataTypes }=require ("sequelize"); 

module.exports= sequelize=>{
    sequelize.define('Resena',{
        titulo:{
            type:DataTypes.STRING,
            unique:true,
            allownull:false
        },
        descripcion:{
            type:DataTypes.STRING,
            allownull:false,
        },
        calificacion:{
            type:DataTypes.INTEGER,
            allownull:false,
        }
    })
}
