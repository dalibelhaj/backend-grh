const { verifySignUp } = require("../middleware");
const controller = require("../controllers/employe.controller");


module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    const employes = require("../controllers/employe.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", employes.upload,employes.create);
    
    // Retrieve all Tutorials
    router.get("/", employes.findAll);
  
    // Retrieve all published Tutorials
    //router.get("/published", tutorials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", employes.findOne);
  
    // Update a Tutorial with id
    router.put("/:id",employes.update);
    router.put("/pic/:id",employes.upload,employes.updatefile)
    router.get("/pic/get/:id",employes.upload,employes.getfile)
    router.get("/pic/files",employes.upload,employes.getListFiles)
  
    // Delete a Tutorial with id
    router.delete("/:id", employes.delete);
  
    // Delete all Tutorials
    router.delete("/", employes.deleteAll);
  
    app.use('/api/employes', router);
  };
  