module.exports = app => {
    const offres = require("../controllers/offremploit.controller");
  
    var router = require("express").Router();
  
    router.post("/", offres.create);
  
    router.get("/", offres.findAll);
  
    //router.get("/published", tutorials.findAllPublished);
  
    router.get("/:id", offres.findOne);
  
    router.put("/:id", offres.update);

    router.delete("/:id", offres.delete);
  
    router.delete("/", offres.deleteAll);
  
    app.use('/api/offres', router);
  };
  