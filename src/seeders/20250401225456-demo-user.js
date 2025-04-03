"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash("password123", 10);
    const hashedPassword2 = await bcrypt.hash("password456", 10);

    await queryInterface.bulkInsert("Users", [
      {
        username: "john_doe",
        password: hashedPassword1,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "admin_user",
        password: hashedPassword2,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
