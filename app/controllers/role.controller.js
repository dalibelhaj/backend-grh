const db = require("../models");
const Employe = db.employes;
const Role = db.roles;
const fixe_entretien = db.fixe_entretiens;


exports.findAllrole = async (req, res, next)=>{
    async function findAllOffres(){
    
      const employes= await Employe.findAll({
        
        include: [
          {
            model: Role,
             
            //attributes: ["utilisateur"],
            
            // through: {
            //   attributes: ["roleId", "employeId"],
            // }
       
          },
        ],
      });
       
      return employes;
      
      }
      next;
    try {
        const employe = await findAllOffres();
        res.status(200).json(employe);
        next();
    } catch(e) {
        console.log(e);
        res.sendStatus(404);
    }
  };