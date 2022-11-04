module.exports=(Sequelize,DataTypes)=>{
    const Commentaires=Sequelize.define(
        'Commentaires',
        {commentaire:{
            type:DataTypes.STRING,
           
        },
        likes:{
            type:DataTypes.INTEGER,
           
        }

});
Commentaires.associate=models=>{
    Commentaires.belongsTo(models.Utilisateurs,{onDelete:"cascade"});
    Commentaires.belongsTo(models.Blogs,{onDelete:"cascade"});
}
  return Commentaires;
};