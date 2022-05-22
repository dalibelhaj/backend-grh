module.exports = app => {
    const entretiens = require("../controllers/entretien.controller");
  
    var router = require("express").Router();
  
    router.post("/", entretiens.create);
  
    router.get("/", entretiens.findAll);
  
    //router.get("/published", tutorials.findAllPublished);
  
    router.get("/:id", entretiens.findOne);

    router.put("/:id", entretiens.update);

    router.delete("/:id", entretiens.delete);

    router.delete("/", entretiens.deleteAll);
  
    app.use('/api/entretiens', router);
  };