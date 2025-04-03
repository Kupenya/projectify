"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Projects", [
      {
        title: "Project Alpha",
        description: "This is the description for Project Alpha.",
        status: "not started",
        userId: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Project Beta",
        description: "This is the description for Project Beta.",
        status: "in progress",
        userId: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Project Gamma",
        description: "This is the description for Project Gamma.",
        status: "completed",
        userId: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Projects", null, {});
  },
};
