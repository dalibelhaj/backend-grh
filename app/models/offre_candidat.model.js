const candidatModel = require("./candidat.models");
const offremploitModel = require("./offremploit.model");


module.exports = (sequelize, Sequelize) => {
    const Offre_entretien = sequelize.define( "offre_candidat", {
        CandidatId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
              model: candidatModel,
              key: 'id'
            }
          },
          OffreId: {
            type: Sequelize.INTEGER,
            references: {
              model: offremploitModel,
              key: 'id'
            }
          }
          
        });
    return Offre_entretien;
};
