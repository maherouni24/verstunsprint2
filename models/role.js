


module.exports=(sequelize,DataTypes)=>{
    const role=sequelize.define(
        'role_type_users',
        {
            role_name:{
                type:DataTypes.STRING
            }
        }
    );
   
    return role;
}