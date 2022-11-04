module.exports=(sequelize,DataTypes)=>{
    const commentpost=sequelize.define(
        'commentpost',
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
            status:{
                type:DataTypes.STRING
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
    commentpost.associate=models=>{
        commentpost.belongsTo(models.post,{onDelete:"cascade"})
        commentpost.belongsTo(models.user,{onDelete:"cascade"})
    }
    
    return commentpost;
}