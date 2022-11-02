module.exports=(sequelize,DataTypes)=>{
    const likecomment=sequelize.define(
        'likecomment',
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
    likecomment.associate=models=>{
        likecomment.belongsTo(models.comment,{onDelete:"cascade"})
        likecomment.belongsTo(models.user,{onDelete:"cascade"})
    }
    return likecomment;
}