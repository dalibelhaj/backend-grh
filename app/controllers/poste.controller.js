const db = require("../models");
const Poste = db.postes;
const Op = db.Sequelize.Op;

exports.addPoste = async (req, res )=> {

    let info = {
        nomposte: req.body.nomposte,

  
    }
  
    const poste = await Poste.create(info) 
    try{
    res.status(200).send(poste)
    console.log(poste)
  
    } catch (err) {
      console.error("Something went wrong")
      console.error(err)
  }
  };

  exports.findAll = (req, res) => {
    const nomposte = req.query.nomposte;
    var condition = nomposte ? { nomposte: { [Op.like]: `%${nomposte}%` } } : null;
  
    Poste.findAll({ where: condition })
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
  
  