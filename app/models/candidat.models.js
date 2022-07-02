module.exports = (sequelize, Sequelize) => {
    const Candidat = sequelize.define( "candidat", {
     nom: {
         type: Sequelize.STRING
     },
     prenom: {
         type: Sequelize.STRING
     },
     mail: {
        type: Sequelize.STRING 
     },
     tel: {
         type: Sequelize.STRING
     },
     adresse: {
         type: Sequelize.TEXT
     },
     diplomes: {
        type: Sequelize.TEXT
    },
  
    experience: {
    type: Sequelize.TEXT

    },
    annee : {
        type :Sequelize.TEXT

    },
    skills:{
        type:Sequelize.TEXT
    },
    picture:{
        type:Sequelize.STRING

    }, 
    cv:{
      type:Sequelize.STRING

    },
    statut:{
    type:Sequelize.STRING

    }
    
    });


return Candidat 
};