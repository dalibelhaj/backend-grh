const db = require("../models");
const config = require("../config/auth.config");
const Employe = db.employes;
const Role = db.roles;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const multer = require('multer');
const path = require('path')




const storage = multer.diskStorage({
  destination:async (req, file, cb) => {
      cb(null, './app/profileimg')
      
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
  }
})

exports.upload = multer({
storage: storage,
limits: { fileSize: '5242880' },
fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const mimeType = fileTypes.test(file.mimetype)  
    const extname = fileTypes.test(path.extname(file.originalname))

    if(mimeType && extname) {
        return cb(null, true)
        
    }else{
    return cb('Give proper files formate to upload : jpeg|jpg|png|gif')
    }
} 
}).single('picture')


// ____________ user signup

exports.signup = async (req, res) => {
  // Save User to Database
  const salt = await bcrypt.genSaltSync(8);
  const password = await req.body.password;

  Employe.create({
    utilisateur: req.body.utilisateur,
    login: req.body.login,
    mail: req.body.mail,
    post: req.body.post,
    action: req.body.action,
    password:bcrypt.hashSync(password,salt)
   
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: [req.body.roles]
            }
          }
          

        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!with role" });
          });
        });
        console.log(req.body.roles)
      } else {
        // user role = 1
        user.setRoles([2]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  
};

// __________ user signin
exports.signin = (req, res) => {
  Employe.findOne({
    where: {
      login: req.body.login
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

       var token = jwt.sign({ id: user.id }, config.secret,{
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          login: user.login,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};





  // 1. create candidat

exports.create = async (req, res )=> {
  const salt = await bcrypt.genSaltSync(8);
  const password = await req.body.password;
  const   info  = {
    utilisateur: req.body.utilisateur,
    login: req.body.login,
    mail: req.body.mail,
    post: req.body.post,
    action: req.body.action,
    password: bcrypt.hashSync(password,salt),
    picture:req.file ? req.file.path: ''


  }

  const employe = await Employe.create(info) 
  try{
  res.status(200).send(employe)
  console.log(employe)
  console.log(req.formdata)
  console.log(req.file)
  
  
  } catch (err) {
    console.error("Something went wrong , connot be empty!!!!")
    console.error(err)
}
};


  // Retrieve all employes from the database.
  exports.findAll = (req, res) => {
    const utilisateur = req.query.utilisateur;
    var condition = utilisateur ? { utilisateur: { [Op.like]: `%${utilisateur}%` } } : null;
  
    Employe.findAll({ where: condition })
      .then(data => {
        res.send(data);
         
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving employes."
        });
      });
  };
  
  // Find a single employe with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
    
    Employe.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
          
        } else {
          res.status(404).send({
            message: `Cannot find employe with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving employe with id=" + id
        });
      });
  };
  
  
  exports.updatefile = async (req, res) => {
    const id = req.params.id;
    
    let info = {
      utilisateur: req.body.utilisateur,
      login: req.body.login,
      mail: req.body.mail,
      post: req.body.post,
      action: req.body.action,
      picture:req.file ? req.file.path: ''
  
    }
 
    try{
      const employe = await Employe.update(info,{
        where: { id: id }
      }) 
    res.status(200).send(employe)
    console.log(employe)
    console.log(req.formdata)
    console.log(req.file)
    } catch (err) {
      console.error("Something went wrong , connot be empty!!!!")
      console.error(err)
  }
  };


  // Update a employe by the id in the request
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Employe.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Employe was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update employe with id=${id}. Maybe employe was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating employe with id=" + id
        });
      });
  };



  // Delete a employe with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Employe.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          
          res.send({
            message: "employe was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete employe with id=${id}. Maybe employe was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete employe with id=" + id
        });
      });
  };
  
  // Delete all employes from the database.
  exports.deleteAll = (req, res) => {
    Employe.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} employes were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all employes."
        });
      });
  };

  

    exports.getfile = (req, res) => {
      const id = req.params.id;
      
      Employe.findByPk(id)
        .then(data => {
          if (data) {
            res.send(data=req.file);
            
          } else {
            res.status(404).send({
              message: `Cannot find employe with id=${id}.`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error retrieving employe with id=" + id
          });
        });
    };

    exports.getListFiles = (req, res) => {
      const directoryPath = __basedir + "/app/profileimg";
    
      fs.readdir(directoryPath, function (err, files) {
        if (err) {
          res.status(500).send({
            message: "Unable to scan files!",
          });
        }
    
        let fileInfos = [];
    
        files.forEach((file) => {
          fileInfos.push({
            name: file,
            url: baseUrl + file,
          });
        });
    
        res.status(200).send(fileInfos);
      });
    };
  
  


//}).fields([{ name: 'picture', maxCount: 1 }, { name: 'cv', maxCount: 1 }]) 











  // find all actif employe
 // exports.findAllPublished = (req, res) => {
  //  Employe.findAll({ where: { published: true } })
  //    .then(data => {
  //      res.send(data);
   //   })
   //   .catch(err => {
   //     res.status(500).send({
   //       message:
    //        err.message || "Some error occurred while retrieving employe."
    //    });
   //   });
  //};
      