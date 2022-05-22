const db = require("../models");
const Entretien = db.entretiens;
const Op = db.Sequelize.Op;

// Create and Save entretien
exports.create = (req, res) => {
  // Validate request
  if (!req.body.datentretien) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create entretien
  const entretien = {
    datentretien: req.body.datentretien,
    heur: req.body.heur,
    description: req.body.description,

  };

  // Save entretien in the database
  Entretien.create(entretien)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the entretien."
      });
    });
};

// Retrieve all entretiens from the database.
exports.findAll = (req, res) => {
  const datentretien = req.query.datentretien;
  var condition = datentretien ? { datentretien: { [Op.like]: `%${datentretien}%` } } : null;

  Entretien.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving entretiens."
      });
    });
};

// Find a single entretien with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Entretien.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find entretien with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving entretien with id=" + id
      });
    });
};

// Update a entretien by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Entretien.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Entretien was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update entretien with id=${id}. Maybe entretien was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating entretien with id=" + id
      });
    });
};

// Delete a entretien with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Entretien.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "entretien was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete entretien with id=${id}. Maybe entretien was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete entretien with id=" + id
      });
    });
};

// Delete all entretiens from the database.
exports.deleteAll = (req, res) => {
  Entretien.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} entretiens were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all entretiens."
      });
    });
};