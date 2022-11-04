module.exports=(Sequelize,DataTypes)=>{
    const Utilisateurs=Sequelize.define(
        'Utilisateurs',
        {nom:{
            type:DataTypes.STRING,
           
        },
        prenom:{
            type:DataTypes.STRING,
           
        },
        mail:{
            type:DataTypes.STRING,
           
        },
        adresse:{
            type:DataTypes.STRING,
           
        },
        tel:{
            type:DataTypes.INTEGER,
        },
        age:{
            type:DataTypes.INTEGER,
        },
        dateNaissance:{
            type:DataTypes.DATE,
        },
        password :{
            type: DataTypes.STRING,
        }
 
    });
    Utilisateurs.associate=models=>{
        Utilisateurs.belongsTo(models.Roles,{onDelete:"cascade"})
    }
return Utilisateurs;
}