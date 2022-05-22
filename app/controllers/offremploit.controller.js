const { dateStrings } = require("../config/db.config");
const db = require("../models");
const Offre = db.offres;
const Op = db.Sequelize.Op;

// Create and Save offre
exports.create = (req, res) => {
    // Validate request
    if (!req.body.titre) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create offre
    const offre = {
      refoffre: req.body.refoffre,
      titre: req.body.titre,
      description: req.body.description,
      post: req.body.post,
      nembposte: req.body.nembposte,
      exigence: req.body.exigence,
      deparoff: req.body.deparoff,
      finoffre: req.body.finoffre,
      etat: req.body.etat,
    };
  
    // Save offre in the database
    Offre.create(offre)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the offre."
        });
      });
  };
  
  // Retrieve all offres from the database.
  exports.findAll = (req, res) => {
    const refoffre = req.query.refoffre;
    var condition = refoffre ? { refoffre: { [Op.like]: `%${refoffre}%` } } : null;

  
    Offre.findAll({ where: condition })
      .then(data => {
        
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving offres."
        });
      });
  };
  
  // Find a single offre with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Offre.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find offre with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving offre with id=" + id
        });
      });
  };
  
  // Update a offre by the id in the request
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Offre.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "offre was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update offre with id=${id}. Maybe offre was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating offre with id=" + id
        });
      });
  };
  
  // Delete a offre with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Offre.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "offre was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete offre with id=${id}. Maybe offre was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete offre with id=" + id
        });
      });
  };
  
  // Delete all offres from the database.
  exports.deleteAll = (req, res) => {
    Offre.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} offres were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all offres."
        });
      });
  };