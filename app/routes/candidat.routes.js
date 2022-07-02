module.exports = app => {
    const candidats = require("../controllers/candidat.controller");
  
    var router = require("express").Router();
  
    router.post("/", candidats.upload,candidats.addCandidat);
    //router.post("/", candidats.create,candidats.upload);

  
    router.get("/", candidats.findAll);
  
    //router.get("/published", tutorials.findAllPublished);
  
    router.get("/:id", candidats.findOne);

    router.put("/:id", candidats.update);

    router.delete("/:id", candidats.delete);

    router.delete("/", candidats.deleteAll);
  
    app.use('/api/candidats', router);
  };