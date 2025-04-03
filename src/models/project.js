import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class Project extends Model {}

Project.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("not started", "in progress", "completed"),
      defaultValue: "not started",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Project",
    timestamps: true,
  }
);

export default Project;
