module.exports=(sequelize,DataTypes)=>{
    const dislikecomment=sequelize.define(
        'dislikecomment',
        {
            id:{
                type:DataTypes.INTEGER,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true
            },
            commentId:{
                type:DataTypes.INTEGER,
                allowNull:false,
                references:{
                  model:'comments',
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
    dislikecomment.associate=models=>{
        dislikecomment.belongsTo(models.comment,{onDelete:"cascade"})
        dislikecomment.belongsTo(models.user,{onDelete:"cascade"})
    }
    return dislikecomment;
}