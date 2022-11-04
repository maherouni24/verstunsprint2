module.exports=(sequelize,DataTypes)=>{
    const participant=sequelize.define(
        'participant',
        {
            id:{
                type:DataTypes.INTEGER,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true
            },
            visiteId:{
                type:DataTypes.INTEGER,
                allowNull:false,
                references:{
                  model:'visites',
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
    participant.associate=models=>{
        participant.belongsTo(models.visite,{onDelete:"cascade"})
        participant.belongsTo(models.user,{onDelete:"cascade"})
    }
    return participant;
}