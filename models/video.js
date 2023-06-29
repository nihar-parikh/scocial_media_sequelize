"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Video.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Video.hasMany(models.Comment, {
        foreignKey: "commentableId", //necessary otherwise imageId column will be created.
        constraints: false, //necessary if two or more foreign keys refers are in same table.
        scope: {
          //providing scope here eliminates where clause
          commentableType: "video",
        },
        as: "comments",
      });
      Video.belongsToMany(models.Tag, {
        through: {
          model: models.TagTaggable,
          unique: false,
          scope: {
            taggableType: "video",
          },
        },
        foreignKey: "taggableId",
        constraints: false,
        otherKey: "tagId", // Add this line
        as: "tags", // Add this line
      });
    }
  }
  Video.init(
    {
      title: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Video",
    }
  );
  return Video;
};
