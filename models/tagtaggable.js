"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TagTaggable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TagTaggable.init(
    {
      tagId: {
        type: DataTypes.INTEGER,
        unique: "tt_unique_constraint",
      },
      taggableId: {
        type: DataTypes.INTEGER,
        unique: "tt_unique_constraint",
        references: null,
      },
      taggableType: {
        type: DataTypes.STRING,
        unique: "tt_unique_constraint",
      },
    },
    {
      sequelize,
      modelName: "TagTaggable",
    }
  );

  return TagTaggable;
};
