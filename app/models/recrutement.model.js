
//const employeModel = require("./employe.model");
//const offremploitModel = require("./offremploit.model");


module.exports = (sequelize, Sequelize) => {
    const Recrutement = sequelize.define( "recrutements", {
     ttp:Sequelize.TEXT,
     avis:Sequelize.STRING,
    });
    return Recrutement;
};