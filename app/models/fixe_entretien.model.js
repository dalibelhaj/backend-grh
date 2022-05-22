const entretienModel = require("./entretien.model");
const offrecandidatModel = require("./offre_candidat.model");


module.exports = (sequelize, Sequelize) => {
    const Fixe_entretien = sequelize.define( "fixe_entretien", {
        offreCandidatCandidatId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
              model: offrecandidatModel,
              key: 'id'
            }
          },
          entretienId: {
            type: Sequelize.INTEGER,
            references: {
              model: entretienModel,
              key: 'id'
            }
          }
          
        });
    return Fixe_entretien;
};