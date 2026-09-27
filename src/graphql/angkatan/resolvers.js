const { Op } = require("sequelize");
const { Angkatan, Mahasiswa } = require("../../models");

const resolvers = {
  Query: {
    angkatan: async () => {
      return await Angkatan.findAll({
        order: [["tahun_ajaran", "ASC"]],
      });
    },
    angkatanById: async (_, { id }) => {
      const item = await Angkatan.findOne({
        where: { id_angkatan: id },
      });
      if (!item) {
        throw new Error("Angkatan tidak ditemukan");
      }
      return item;
    },
    cariAngkatan: async (_, { keyword }) => {
      return await Angkatan.findAll({
        where: {
          tahun_ajaran: { [Op.like]: `%${keyword}%` },
        },
        order: [["tahun_ajaran", "ASC"]],
      });
    },
  },
  Mutation: {
    tambahAngkatan: async (_, { input }) => {
      const now = new Date();
      return await Angkatan.create({
        ...input,
        create_at: now,
        update_at: now,
        delete_at: null,
      });
    },
    updateAngkatan: async (_, { id, input }) => {
      const item = await Angkatan.findOne({
        where: { id_angkatan: id },
      });
      if (!item) {
        throw new Error("Angkatan tidak ditemukan");
      }
      const now = new Date();
      await item.update({
        ...input,
        update_at: now,
      });
      return item;
    },
    deleteAngkatan: async (_, { id }) => {
      const item = await Angkatan.findOne({
        where: { id_angkatan: id },
      });
      if (!item) {
        throw new Error("Angkatan tidak ditemukan");
      }
      const now = new Date();
      await item.update({
        delete_at: now,
        update_at: now,
      });
      return item;
    },
    restoreAngkatan: async (_, { id }) => {
      const item = await Angkatan.findOne({
        where: { id_angkatan: id },
      });
      if (!item) {
        throw new Error("Angkatan tidak ditemukan");
      }
      const now = new Date();
      await item.update({
        delete_at: null,
        update_at: now,
      });
      return item;
    },
  },
  Angkatan: {
    mahasiswa: async (parent) => {
      const id = parent.id_angkatan || parent.dataValues?.id_angkatan;
      return await Mahasiswa.findAll({
        where: { id_angkatan: id },
      });
    },
  },
};

module.exports = resolvers;
