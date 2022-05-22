const { verifySignUp } = require("../middleware");
const employes = require("../controllers/employe.controller.js");


module.exports = app => {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
      
    
      var router = require("express").Router();
    
  
      //Signup
      router.post("/signup",
      [verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExistedd
    ],
      employes.signup);
      

      //Sigin
      router.post("/signin", employes.signin);

      app.use('/api/auth', router);


}