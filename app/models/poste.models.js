module.exports = (sequelize, Sequelize) => {
    const Poste = sequelize.define( "poste", {
     nomposte: {
         type: Sequelize.STRING
     },

    });
    return Poste;
};