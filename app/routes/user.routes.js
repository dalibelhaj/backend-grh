const { authJwt } = require("../middleware");
const users = require("../controllers/user.controller");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  var router = require("express").Router();


  router.get("/all", users.allAccess);

  router.get(
    "/user",
    [authJwt.verifyToken],
    users.userBoard
  );


  router.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    users.adminBoard
  );


  app.use('/api/user', router);
};
