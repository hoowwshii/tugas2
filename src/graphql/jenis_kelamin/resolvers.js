const { Op } = require("sequelize");
const { JenisKelamin, Mahasiswa } = require("../../models");

const resolvers = {
  Query: {
    jenisKelamin: async () => {
      return await JenisKelamin.findAll({
        order: [["nama", "ASC"]],
      });
    },
    jenis_kelamin: async () => {
      return await JenisKelamin.findAll({
        order: [["nama", "ASC"]],
      });
    },
    jenisKelaminById: async (_, { id }) => {
      const item = await JenisKelamin.findOne({
        where: { id_jenis_kelamin: id },
      });
      if (!item) {
        throw new Error("Jenis kelamin tidak ditemukan");
      }
      return item;
    },
    cariJenisKelamin: async (_, { keyword }) => {
      return await JenisKelamin.findAll({
        where: {
          [Op.or]: [
            { kode: { [Op.like]: `%${keyword}%` } },
            { nama: { [Op.like]: `%${keyword}%` } },
          ],
        },
        order: [["nama", "ASC"]],
      });
    },
  },
  Mutation: {
    tambahJenisKelamin: async (_, { input }) => {
      const now = new Date();
      return await JenisKelamin.create({
        ...input,
        create_at: now,
        update_at: now,
        delete_at: null,
      });
    },
    updateJenisKelamin: async (_, { id, input }) => {
      const item = await JenisKelamin.findOne({
        where: { id_jenis_kelamin: id },
      });
      if (!item) {
        throw new Error("Jenis kelamin tidak ditemukan");
      }
      const now = new Date();
      await item.update({
        ...input,
        update_at: now,
      });
      return item;
    },
    deleteJenisKelamin: async (_, { id }) => {
      const item = await JenisKelamin.findOne({
        where: { id_jenis_kelamin: id },
      });
      if (!item) {
        throw new Error("Jenis kelamin tidak ditemukan");
      }
      const now = new Date();
      await item.update({
        delete_at: now,
        update_at: now,
      });
      return item;
    },
    restoreJenisKelamin: async (_, { id }) => {
      const item = await JenisKelamin.findOne({
        where: { id_jenis_kelamin: id },
      });
      if (!item) {
        throw new Error("Jenis kelamin tidak ditemukan");
      }
      const now = new Date();
      await item.update({
        delete_at: null,
        update_at: now,
      });
      return item;
    },
  },
  JenisKelamin: {
    mahasiswa: async (parent) => {
      const id = parent.id_jenis_kelamin || parent.dataValues?.id_jenis_kelamin;
      return await Mahasiswa.findAll({
        where: { id_jenis_kelamin: id },
      });
    },
  },
};

module.exports = resolvers;
