module.exports=(sequelize,DataTypes)=>{
    const comment=sequelize.define(
        'comment',
        {
            id:{
                type:DataTypes.INTEGER,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true
            },
            content:{
                type:DataTypes.STRING,
                allowNull:false
            },
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
    comment.associate=models=>{
        comment.belongsTo(models.sitearcheologique,{onDelete:"cascade"})
        comment.belongsTo(models.user,{onDelete:"cascade"})
    }
    comment.associate=models=>{
        comment.hasMany(models.likecomment,{onDelete:"cascade"})
        comment.hasMany(models.dislikecomment,{onDelete:"cascade"})
    }
    
    return comment;
}