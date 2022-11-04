module.exports=(sequelize,DataTypes)=>{
    const visite=sequelize.define(
        'visite',
        {
            dateV:{
                type:DataTypes.DATE,
                allowNull:false
            },
            nbPersonne:{
                type:DataTypes.INTEGER,   
            },
            like:{
                type:DataTypes.INTEGER,   
            },
            dislike:{
                type:DataTypes.INTEGER,   
            }
        }
    );
    visite.associate=models=>{
        visite.belongsTo(models.sitearcheologique,{onDelete:"cascade"})
    }
    return visite;
}