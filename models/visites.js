module.exports=(sequelize,DataTypes)=>{
    const visite=sequelize.define(
        'visite',
        {
            dateV:{
                type:DataTypes.DATE,
                allowNull:false
            }
        }
    );
    visite.associate=models=>{
        visite.belongsTo(models.sitearcheologique,{onDelete:"cascade"})
    }
    return visite;
}