module.exports=(sequelize,DataTypes)=>{
    const like=sequelize.define(
        'like',
        {
            
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