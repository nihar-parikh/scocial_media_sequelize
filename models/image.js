"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Image.hasMany(models.Comment, {
        foreignKey: "commentableId", //necessary otherwise imageId column will be created.
        constraints: false, //necessary if two or more foreign keys refers are in same table.
        scope: {
          //providing scope here eliminates where clause
          commentableType: "image",
        },
        as: "comments",
      });
      Image.belongsToMany(models.Tag, {
        through: {
          model: models.TagTaggable,
          unique: false,
          scope: {
            taggableType: "image",
          },
        },
        foreignKey: "taggableId",
        constraints: false,
        otherKey: "tagId", // Add this line
        as: "tags", // Add this line
      });
    }
  }
  Image.init(
    {
      title: DataTypes.STRING,
      url: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
