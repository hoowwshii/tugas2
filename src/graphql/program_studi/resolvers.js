const { Op } = require("sequelize");
const { ProgramStudi, Mahasiswa } = require("../../models");

const resolvers = {
  Query: {
    programStudi: async () => {
      return await ProgramStudi.findAll({
        order: [["nama", "ASC"]],
      });
    },
    program_studi: async () => {
      return await ProgramStudi.findAll({
        order: [["nama", "ASC"]],
      });
    },
    programStudiById: async (_, { id }) => {
      const item = await ProgramStudi.findOne({
        where: { id_program_studi: id },
      });
      if (!item) {
        throw new Error("Program studi tidak ditemukan");
      }
      return item;
    },
    cariProgramStudi: async (_, { keyword }) => {
      return await ProgramStudi.findAll({
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
    tambahProgramStudi: async (_, { input }) => {
      const now = new Date();
      return await ProgramStudi.create({
        ...input,
        create_at: now,
        update_at: now,
        delete_at: null,
      });
    },
    updateProgramStudi: async (_, { id, input }) => {
      const item = await ProgramStudi.findOne({
        where: { id_program_studi: id },
      });
      if (!item) {
        throw new Error("Program studi tidak ditemukan");
      }
      const now = new Date();
      await item.update({
        ...input,
        update_at: now,
      });
      return item;
    },
    deleteProgramStudi: async (_, { id }) => {
      const item = await ProgramStudi.findOne({
        where: { id_program_studi: id },
      });
      if (!item) {
        throw new Error("Program studi tidak ditemukan");
      }
      const now = new Date();
      await item.update({
        delete_at: now,
        update_at: now,
      });
      return item;
    },
    restoreProgramStudi: async (_, { id }) => {
      const item = await ProgramStudi.findOne({
        where: { id_program_studi: id },
      });
      if (!item) {
        throw new Error("Program studi tidak ditemukan");
      }
      const now = new Date();
      await item.update({
        delete_at: null,
        update_at: now,
      });
      return item;
    },
  },
  ProgramStudi: {
    mahasiswa: async (parent) => {
      const id = parent.id_program_studi || parent.dataValues?.id_program_studi;
      return await Mahasiswa.findAll({
        where: { id_program_studi: id },
      });
    },
  },
};

module.exports = resolvers;
