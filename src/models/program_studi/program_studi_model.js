const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const ProgramStudi = sequelize.define(
  "ProgramStudi",
  {
    id_program_studi: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    kode: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    nama: {
      type: DataTypes.STRING(100),
    },
    create_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    update_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    delete_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "program_studi",
    timestamps: false,
  }
);

module.exports = ProgramStudi;
