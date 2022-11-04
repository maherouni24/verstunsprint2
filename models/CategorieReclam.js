"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CategorieReclam extends Model {
    
    static associate(models) {
      // define association here
      CategorieReclam.belongsTo(models.Reclamation, { onDelete: "CASCADE"});
    }
  }
  CategorieReclam.init(
    {
      type: DataTypes.ENUM({
        values: ["Améloiration de service", "plainte"],
      }),

    },
    {
      sequelize,
      modelName: "CategorieReclam",
    }
  );
  return CategorieReclam;
};
