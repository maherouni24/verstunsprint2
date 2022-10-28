module.exports=(sequelize,DataTypes)=>{
    const role=sequelize.define(
        'role',
        {
            role:{
                type:DataTypes.STRING,
                allowNull:false
            }
        }
    );
    role.associate=models=>{
        role.hasMany(models.user,{onDelete:"cascade"})
    }
    return role;
}