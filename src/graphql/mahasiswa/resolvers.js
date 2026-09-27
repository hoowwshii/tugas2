const { Op } = require("sequelize");
const { Mahasiswa, JenisKelamin, ProgramStudi, Angkatan } = require("../../models");

const resolvers = {
  Query: {
    mahasiswa: async () => {
      return await Mahasiswa.findAll({
        order: [["nama", "ASC"]],
      });
    },
    mahasiswaById: async (_, { id }) => {
      const item = await Mahasiswa.findOne({
        where: { id_mahasiswa: id },
      });
      if (!item) {
        throw new Error("Mahasiswa tidak ditemukan");
      }
      return item;
    },
    cariMahasiswa: async (_, { keyword }) => {
      return await Mahasiswa.findAll({
        where: {
          [Op.or]: [
            { nim: { [Op.like]: `%${keyword}%` } },
            { nama: { [Op.like]: `%${keyword}%` } },
            { email: { [Op.like]: `%${keyword}%` } },
          ],
        },
        order: [["nama", "ASC"]],
      });
    },
  },
  Mutation: {
    tambahMahasiswa: async (_, { input }) => {
      const now = new Date();
      return await Mahasiswa.create({
        ...input,
        create_at: now,
        update_at: now,
        delete_at: null,
      });
    },
    updateMahasiswa: async (_, { id, input }) => {
      const item = await Mahasiswa.findOne({
        where: { id_mahasiswa: id },
      });
      if (!item) {
        throw new Error("Mahasiswa tidak ditemukan");
      }
      const now = new Date();
      await item.update({
        ...input,
        update_at: now,
      });
      return item;
    },
    deleteMahasiswa: async (_, { id }) => {
      const item = await Mahasiswa.findOne({
        where: { id_mahasiswa: id },
      });
      if (!item) {
        throw new Error("Mahasiswa tidak ditemukan");
      }
      const now = new Date();
      await item.update({
        delete_at: now,
        update_at: now,
      });
      return item;
    },
    restoreMahasiswa: async (_, { id }) => {
      const item = await Mahasiswa.findOne({
        where: { id_mahasiswa: id },
      });
      if (!item) {
        throw new Error("Mahasiswa tidak ditemukan");
      }
      const now = new Date();
      await item.update({
        delete_at: null,
        update_at: now,
      });
      return item;
    },
  },
  Mahasiswa: {
    jenisKelamin: async (parent) => {
      const id = parent.id_jenis_kelamin || parent.dataValues?.id_jenis_kelamin;
      if (!id) return null;
      return await JenisKelamin.findOne({
        where: { id_jenis_kelamin: id },
      });
    },
    programStudi: async (parent) => {
      const id = parent.id_program_studi || parent.dataValues?.id_program_studi;
      if (!id) return null;
      return await ProgramStudi.findOne({
        where: { id_program_studi: id },
      });
    },
    angkatan: async (parent) => {
      const id = parent.id_angkatan || parent.dataValues?.id_angkatan;
      if (!id) return null;
      return await Angkatan.findOne({
        where: { id_angkatan: id },
      });
    },
  },
};

module.exports = resolvers;
