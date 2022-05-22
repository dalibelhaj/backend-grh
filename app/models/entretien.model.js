module.exports = (sequelize, Sequelize) => {
    const Entretien = sequelize.define( "entretien", {
     datentretien: {
         type: Sequelize.DATE
     },
     heur: {
         type: Sequelize.DATE
     },
     description: {
        type: Sequelize.TEXT
     }
    });
    return Entretien;
};