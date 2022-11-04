module.exports=(sequelize,DataTypes)=>{
    const Roles=sequelize.define(
        'Roles',
        {
            role_name:{
                type:DataTypes.STRING
            }
        }
    );
   
    return Roles;
}