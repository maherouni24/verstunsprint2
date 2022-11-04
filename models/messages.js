module.exports=(sequelize,DataTypes)=>{
    const message=sequelize.define(
        'message',
        {
            title:{
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
            likes:{
                type:DataTypes.INTEGER,
                allowNull:false
            }
        }
    );
    message.associate=models=>{
        message.belongsTo(models.user,{onDelete:"cascade"})
    }
    return message;
}