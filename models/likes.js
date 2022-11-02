module.exports=(sequelize,DataTypes)=>{
    const like=sequelize.define(
        'like',
        {
            sitearcheologiqueId:{
                type:DataTypes.INTEGER,
                allowNull:false,
                references:{
                  model:'sitearcheologiques',
                  key:'id'  
                }  
            } ,  
            userId:{
                type:DataTypes.INTEGER,
                allowNull:false,
                references:{
                  model:'users',
                  key:'id'  
                }  
            }   
        }
    );
    like.associate=models=>{
        like.belongsTo(models.sitearcheologique,{onDelete:"cascade"})
    }
    like.associate=models=>{
        like.belongsTo(models.user,{onDelete:"cascade"})
    }
    return like;
}