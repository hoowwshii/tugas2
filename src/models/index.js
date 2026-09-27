const sequelize = require("../config/database");
const JenisKelamin = require("./jenis_kelamin/jenis_kelamin_model");
const ProgramStudi = require("./program_studi/program_studi_model");
const Angkatan = require("./angkatan/angkatan_model");
const Mahasiswa = require("./mahasiswa/mahasiswa_model");

// Associations
Mahasiswa.belongsTo(JenisKelamin, { foreignKey: "id_jenis_kelamin" });
Mahasiswa.belongsTo(ProgramStudi, { foreignKey: "id_program_studi" });
Mahasiswa.belongsTo(Angkatan, { foreignKey: "id_angkatan" });

JenisKelamin.hasMany(Mahasiswa, { foreignKey: "id_jenis_kelamin" });
ProgramStudi.hasMany(Mahasiswa, { foreignKey: "id_program_studi" });
Angkatan.hasMany(Mahasiswa, { foreignKey: "id_angkatan" });

module.exports = {
  sequelize,
  JenisKelamin,
  ProgramStudi,
  Angkatan,
  Mahasiswa,
};
