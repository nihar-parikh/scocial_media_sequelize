"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.belongsToMany(models.Image, {
        through: {
          model: models.TagTaggable,
          unique: false,
        },
        foreignKey: "tagId",
        constraints: false,
        otherKey: "taggableId", // Add this line
        as: "images",
      });
      Tag.belongsToMany(models.Video, {
        through: {
          model: models.TagTaggable,
          unique: false,
        },
        foreignKey: "tagId",
        constraints: false,
        otherKey: "taggableId", // Add this line
        as: "videos",
      });
    }
  }
  Tag.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Tag",
    }
  );
  return Tag;
};
