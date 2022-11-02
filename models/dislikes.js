module.exports=(sequelize,DataTypes)=>{
    const dislike=sequelize.define(
        'dislike',
        {
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true
            },
            sitearcheologiqueId:{
                type:DataTypes.INTEGER,
                allowNull:false,
                references:{
                  model:'sitearcheologiques',
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
    dislike.associate=models=>{
        dislike.belongsTo(models.sitearcheologique,{onDelete:"cascade"})
        dislike.belongsTo(models.user,{onDelete:"cascade"})
    }
    return dislike;
}