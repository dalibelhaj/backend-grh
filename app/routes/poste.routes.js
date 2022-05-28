module.exports = app => {
    const poste = require("../controllers/poste.controller");
  
    var router = require("express").Router();
  
    router.post("/", poste.addPoste);
    //router.post("/", candidats.create,candidats.upload);
  
    router.get("/", poste.findAll);
  

  
    app.use('/api/postes', router);
  };