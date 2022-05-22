const db = require("../models");
const Candidat = db.candidats;
const Op = db.Sequelize.Op;
const multer = require('multer');
const path = require('path')






// 1. create candidat

exports.addCandidat = async (req, res )=> {

  let info = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    mail: req.body.mail,
    tel: req.body.tel,
    adresse: req.body.adresse,
    diplomes: req.body.diplomes,
    experience: req.body.experience,
    skills: req.body.skills,
    statut:req.body.statut,
    picture:req.files.picture[0].path,
    cv:req.files.cv[0].path,

  }

  const candidat = await Candidat.create(info) 
  try{
  res.status(200).send(candidat)
  console.log(candidat)
  console.log(req.formdata)
  console.log(req.file)
  } catch (err) {
    console.error("Something went wrong")
    console.error(err)
}
};


  
  // Retrieve all candidats from the database.
  exports.findAll = async (req, res) => {
    const nom = req.query.nom;
    var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;
  
    Candidat.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving candidats."
        });
        
      });
      return;
  };
  
  // Find a single candidat with an id
  exports.findOne = async (req, res) => {
    const id = req.params.id;
  
    Candidat.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find candidat with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving candidat with id=" + id
        });
        
      });
      return;
  };
  
  // Update a candidat by the id in the request
  exports.update = async (req, res) => {
    const id = req.params.id;
  
    Candidat.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Candidat was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update candidat with id=${id}. Maybe candidat was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating candidat with id=" + id
        });
        
      });
      return;
  };
  
  // Delete a candidat with the specified id in the request
  exports.delete = async (req, res) => {
    const id = req.params.id;
  
    Candidat.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "candidat was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete candidat with id=${id}. Maybe candidat was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete candidat with id=" + id
        });
        
      });
      return;
  };
  
  // Delete all candidats from the database.
  exports.deleteAll =async  (req, res) => {
    Candidat.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} candidats were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all candidats."
        });
        
      });
      return;
  };

  const storage = multer.diskStorage({
    destination:async (req, file, cb) => {
      if (file.fieldname === "picture"){
        cb(null, './app/images')
      }
      else if (file.fieldname === "cv"){
        cb(null, './app/cv')
      }
    },
    filename: (req, file, cb) => {
      if (file.fieldname === "picture"){
        cb(null, Date.now() + path.extname(file.originalname))
      }
      else if (file.fieldname === "cv"){
        cb(null, Date.now() + path.extname(file.originalname))

      }
    }
})

exports.upload = multer({
  storage: storage,
  limits: { fileSize: '5242880' },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "picture"){

      const fileTypes = /jpeg|jpg|png|gif/
      const mimeType = fileTypes.test(file.mimetype)  
      const extname = fileTypes.test(path.extname(file.originalname))

      if(mimeType && extname) {
         return cb(null, true)
          
      }else{
      return cb('Give proper files formate to upload = /jpeg|jpg|png|gif/')
      }
  } 
  
  else if (file.fieldname === "cv"){
    const fileTypes = /docx|doc|pdf/
    const mimeType = fileTypes.test(file.mimetype)  
    const extname = fileTypes.test(path.extname(file.originalname))

    if(mimeType && extname) {
       return cb(null, true)
        
    }else{
    return cb('Give proper files formate to upload = /docx|doc|pdf/ ')
    }
} 
}


}).fields([{ name: 'picture', maxCount: 1 }, { name: 'cv', maxCount: 1 }]) 
//}).single('picture')











