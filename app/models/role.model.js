module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
      //timestamps: false,
      //createdAt: false,
      //updatedAt: false,
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
      
    });
  
    return Role;
  };