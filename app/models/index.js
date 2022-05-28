const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    //operatorsAliases: false,

   pool: {
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employes = require("./employe.model")(sequelize, Sequelize);
db.candidats = require("./candidat.models")(sequelize, Sequelize);
db.offres = require("./offremploit.model")(sequelize,Sequelize);
db.entretiens = require("./entretien.model")(sequelize,Sequelize);
db.offre_candidats= require("./offre_candidat.model")(sequelize,Sequelize);
db.fixe_entretiens=require("./fixe_entretien.model")(sequelize,Sequelize);
db.roles = require("./role.model")(sequelize,Sequelize);
db.recrutements = require("./recrutement.model")(sequelize,Sequelize);
db.postes = require("./poste.models")(sequelize,Sequelize);


db.candidats.belongsToMany(db.offres, { through: "offre_candidats"});
db.offres.belongsToMany(db.candidats, {through: "offre_candidats"});
db.offre_candidats.belongsTo(db.candidats);
db.offre_candidats.belongsTo(db.offres);
db.candidats.hasMany(db.offre_candidats);
db.offres.hasMany(db.offre_candidats);

db.offre_candidats.belongsToMany(db.entretiens,{through:"fixe_entretiens"});
db.entretiens.belongsToMany(db.offre_candidats,{through:"fixe_entretiens"});
db.fixe_entretiens.belongsTo(db.offre_candidats);
db.fixe_entretiens.belongsTo(db.entretiens);
db.offre_candidats.hasMany(db.fixe_entretiens);
db.entretiens.hasMany(db.fixe_entretiens);

db.employes.belongsToMany(db.offres, { through: "recrutements"});
db.offres.belongsToMany(db.employes, {through: "recrutements"});

db.roles.belongsToMany(db.employes,{
    through:"user_roles",
    foreignKey: "roleId",
    otherKey:"employeId"
});
db.employes.belongsToMany(db.roles,{
    through:"user_roles",
    foreignKey: "employeId",
    otherKey:"roleId"
});


db.ROLES = ["user", "admin"];

module.exports = db;
