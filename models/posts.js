module.exports=(sequelize,DataTypes)=>{
    const post=sequelize.define(
        'post',
        {
            titre:{
                type:DataTypes.STRING,
                allowNull:false
            },
            content:{
                type:DataTypes.STRING,
                allowNull:false
            },
            attachement:{
                type:DataTypes.STRING
            },
            status:{
                type:DataTypes.STRING
            },
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
    post.associate=models=>{
        post.hasMany(models.likepost,{onDelete:"cascade"})
        post.hasMany(models.dislikepost,{onDelete:"cascade"})
        post.hasMany(models.commentpost,{onDelete:"cascade"})
        post.belongsTo(models.user,{onDelete:"cascade"})
    }
    return post;
}