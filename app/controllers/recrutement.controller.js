const db = require("../models");
const Offre = db.offres;
const Employe = db.employes;
const Recrutement = db.recrutements;

  exports.addOffreEmploye =  (req, res, next)=>{
let info = {
     employeId : req.body.employeId,
     offreId : req.body.offreId,
     ttp : req.body.ttp,
     avis : req.body.avis 
}

      Recrutement.create( info);
      //.then(() => res.json({ message: 'Offre employeId created.' }));
      
     try{
       const employeId = req.body.employeId;
       const offreId = req.body.offreId; 

        console.log(employeId);
        console.log(offreId);

              if (!employeId || !offreId) {
                return res.sendStatus(400);
             }
             res.send('Offre employeId created.') 
    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }
    //return recrutement;
 };





exports.findAlloffre = async (req, res, next)=>{
  async function findAllOffres(){
  
    const offres= await Offre.findAll({
      
      include: 
        {
          model: Employe,
           
        //  attributes: ["utilisateur","login"],
          
          through: {
         //   attributes: ["employeId", "offreId","ttp","avis"],
          }
     
        },
      
    });
     
    return offres;
    
    }
    next;
  try {
      const offre = await findAllOffres();
      res.status(200).json( offre);
      next();
  } catch(e) {
      console.log(e);
      res.sendStatus(404);
  }
};


exports.offrId = async (req, res, next, offreId)=> {
  async function findEmployeOffress(id){
   
    const employe = await Employe.findByPk(id, {
      
      include: [
        {
          model: Offre,
           
          
          through: {
            attributes: ["employeId", "offreId","ttp","avis"],
          }
     
        },
      ],
    });
     
    return employe;
     
  } 

next;
  try{
      const offre = await findEmployeOffress(offreId);
      console.log(offre);
      req.offre = offre;
      next(); // go to apiRouter.get('/employee/:employeeId')
  } catch(e) {
      console.log(e);
      res.sendStatus(404);
  }
};


exports.findAllEmploye = async (req, res, next)=> {
  async function findAllEmployes(){
   
    const employes = await Employe.findAll({
     
      include: [
        {
          model: Offre,
           
          attributes: ["refoffre","titre"],
         
          through: {
            attributes: ["employeId", "offreId","ttp","avis"],
          }
     
        },
      ],
    });
     
    return employes;
  
    }
    next;
  try{
      const employe = await findAllEmployes();
      res.status(200).json(employe);
      next(); // go to apiRouter.get('/project/:projectId')
  } catch(e) {
      console.log(e);
      res.sendStatus(404);
  }
};

exports.employId = async (req, res, next,employeId)=>{
  async function findOffresEmployes(id){
   
    const offre= await Offre.findByPk(id, {
      
      include: [
        {
          model: Employe,
           
          
          through: {
            attributes: ["employeId", "offreId","ttp","avis"],
          }
     
        },
      ],
    });
     
    return offre;
    
    }
    next;
  try {
      const employe = await findOffresEmployes(employeId);
      console.log(employe);
      req.employe = employe;
      next();
  } catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
};

exports.updatebyid =  async (req,res,next,offreId) => {



  Recrutement.update(req.body, offreId
    
  ).then(num => {
    if (num == 1) {
      res.send({
        message: "offre was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update offre with id=${offreId}. Maybe offre was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating offre with id=" + offreId
    });
  });
};

exports.getRec = async (req, res, next)=> {
  const id = req.params.offreId
  const id1 = req.params.employeId

  Recrutement.findOne({
    where: {
      employeId: id,
      offreId:id1 ,
      
    }
})
.then(data => {
        
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving offres."
  });
});
}

exports.updateId = async (req, res, next)=> {
const id = req.params.offreId
const id1 = req.params.employeId

const update = Recrutement.update(req.body,{
  where: {
    employeId: id,
    offreId:id1 ,
    
  }
})
.then(num => {
  if (num == 1) {
    res.send({
      message: "offre emlpoye was updated successfully."
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

}

exports.delete = async (req, res, next)=> {
  const id = req.params.offreId
  const id1 = req.params.employeId
  
  const update = Recrutement.destroy({
    where: {
      employeId:id1,
      offreId:id ,
      
    }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "offre emlpoye was delete successfully."
      });
    } else {
      res.send({
        message: `Cannot update offre with id=${id}. Maybe offre was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error deleting offre with id=" + id + id1
    });
  });
  
  }