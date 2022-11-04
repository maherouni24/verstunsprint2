module.exports=(Sequelize,DataTypes)=>{
    const Blogs=Sequelize.define(
        'Blogs',
        {title:{
            type:DataTypes.STRING,
           
        },
        description:{
            type:DataTypes.STRING,
           
        },
     
        likes:{
            type:DataTypes.INTEGER,
           
        }

});
Blogs.associate=models=>{
    Blogs.belongsTo(models.Utilisateurs,{onDelete:"cascade"});
    Blogs.belongsTo(models.Categories,{onDelete:"cascade"});
}
  return Blogs;
};