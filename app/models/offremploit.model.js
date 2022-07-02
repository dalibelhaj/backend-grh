

module.exports = (sequelize, Sequelize) => {
    const Offre = sequelize.define( "offre", {
     refoffre: {
         type: Sequelize.STRING
     },
     titre: {
         type: Sequelize.STRING
     },
     description: {
        type: Sequelize.TEXT
     },
     post: {
         type: Sequelize.STRING
     },
     nembposte: {
         type: Sequelize.INTEGER
     },
     competence: {
         type: Sequelize.STRING
     },
     deparoff: {
         type: Sequelize.DATEONLY
     },
     finoffre: {
         type: Sequelize.DATEONLY
     },
     etat: {
         type: Sequelize.STRING
     }
           
    });
    return Offre;
};

