const { DataTypes }=require ("sequelize"); 

module.exports= sequelize=>{
    sequelize.define('Libros',{
        nombre:{
            type:DataTypes.STRING,
            unique:true,
            allownull:false
        },
        descripcion:{
            type:DataTypes.STRING,
            allownull:false
        },
        calificacion:{
            type:DataTypes.ARRAY(DataTypes.INTEGER)            
        },
        imagen:{
            type:DataTypes.STRING,
            allownull:false
        },
        categoria:{
            type:DataTypes.STRING,
            allownull:false
        },
        inventario:{
            type:DataTypes.INTEGER,
            allownull:false,
            validate:{
                min:0,
                max:1000
            }
        },
        precio:{
            type:DataTypes.FLOAT,
            allownull:false
        }
    })
}