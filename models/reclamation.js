
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reclamation extends Model {
  
    static associate(models) {
      // define association here
      Reclamation.belongsTo(models.User, {
        foreignKey: "ownerId",
        onDelete: "CASCADE",
      });
      Reclamation.belongsTo(models.CategorieReclam, {
        onDelete: "CASCADE"
      });
    }
  }
  Reclamation.init(
    {
      categorie: DataTypes.STRING,
      message: DataTypes.STRING,
      statut: DataTypes.BOOLEAN,
      ownerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Reclamation",
    }
  );
  return Reclamation;
};
