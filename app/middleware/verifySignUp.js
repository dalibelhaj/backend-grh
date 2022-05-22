const { employes } = require("../models");
const db = require("../models");
const ROLES = db.ROLES;
const Employe = db.employes;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  Employe.findOne({
    where: {
        login: req.body.login
    }
  }).then(employe => {
    if (employe) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    Employe.findOne({
      where: {
        mail: req.body.mail
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

checkRolesExistedd = (req,res,next )=> {
  var states = req.body.roles;
  if(states !== "user" && states !== "admin") {
    res.status(400).send({message: "Failed! Role does not exist = " + req.body.roles});
    return; 
   }
next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
  checkRolesExistedd:checkRolesExistedd
};

module.exports = verifySignUp;
