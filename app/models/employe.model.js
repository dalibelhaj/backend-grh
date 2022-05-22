module.exports = (sequelize, Sequelize) => {
    const Employe = sequelize.define( "employe", {
     utilisateur: {
         type: Sequelize.STRING
     },
     login: {
         type: Sequelize.STRING
     },
     mail: {
        type: Sequelize.STRING 
     },
     post: {
         type: Sequelize.STRING
     },
     action: {
         type: Sequelize.STRING
     },
     password: {
         type: Sequelize.STRING
    },

     
     picture: {
         type:Sequelize.STRING
     }
        
    });
    return Employe;
};