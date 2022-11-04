"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Reclamation, {
        foreignKey: "ownerId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  User.init(
    {
      
      nom: DataTypes.STRING,
      prenom : DataTypes.STRING,
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: {
          args: true,
          msg: "Email address already in use!",
        },
      },
      adresse: DataTypes.STRING,
      tel: DataTypes.INTEGER,
      age: DataTypes.INTEGER,
      

      dateNaissance:DataTypes.DATE,
      
      
      
      
      username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Username already in use!",
        },
      },
    password:DataTypes.STRING,
    Matricule_Admin: DataTypes.INTEGER,
    Matricule_Agent: DataTypes.INTEGER,
    role: DataTypes.ENUM({
        values: ["admin", "prestataire", "client"],
      }),
    },
  {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
