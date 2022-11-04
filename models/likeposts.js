module.exports=(sequelize,DataTypes)=>{
    const likepost=sequelize.define(
        'likepost',
        {
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
    likepost.associate=models=>{
        likepost.belongsTo(models.post,{onDelete:"cascade"})
    }
    likepost.associate=models=>{
        likepost.belongsTo(models.user,{onDelete:"cascade"})
    }
    return likepost;
}