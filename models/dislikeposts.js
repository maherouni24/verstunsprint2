module.exports=(sequelize,DataTypes)=>{
    const dislikepost=sequelize.define(
        'dislikepost',
        {
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true
            },
            postId:{
                type:DataTypes.INTEGER,
                allowNull:false,
                references:{
                  model:'posts',
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
    dislikepost.associate=models=>{
        dislikepost.belongsTo(models.post,{onDelete:"cascade"})
        dislikepost.belongsTo(models.user,{onDelete:"cascade"})
    }
    return dislikepost;
}