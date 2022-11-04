module.exports=(sequelize,DataTypes)=>{
    const Categories=sequelize.define(
        'Categories',
        {categorie:{
            type:DataTypes.STRING,
           
        }
    });
   
return Categories;
}