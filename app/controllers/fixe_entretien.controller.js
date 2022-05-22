const db = require("../models");
const Offre = db.offres;
const Candidat = db.candidats;
const Entretien = db.entretiens;
const Offre_candidat = db.offre_candidats;
const Fixe_entretien = db.fixe_entretiens;


// ca marche_______________
  exports.addEntretien = async (req, res, next)=>{
    async function junctionCreate(entretienId , offreCandidatCandidatId) {
  
      const fixe_entretien = await Fixe_entretien.create( { entretienId , offreCandidatCandidatId});
          
       return fixe_entretien;
       
       
      }
      next;
    try{
        const entretienId = req.body.entretienId;
        const offreCandidatCandidatId = req.body.offreCandidatCandidatId;
        console.log(entretienId);
        console.log(offreCandidatCandidatId);
         
              if (!entretienId || !offreCandidatCandidatId) {
                return res.sendStatus(400);
             }
   
        const fixeentretien =  await junctionCreate(entretienId , offreCandidatCandidatId).then(() => res.json({ message: 'Offre candidat created.' }));
          
          
   
    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }
 };





 // ca marchee _________________
exports.findAll = async (req, res, next)=>{
 
    try { 
    const entretien= await Entretien.findAll({
        
        include: {
            model: Offre_candidat,
            include: 
              {
                model: Candidat,
                
              },
              
            
          }
        });
     

      res.status(200).json(entretien);
      next();
  } catch(e) {
      console.log(e);
      res.sendStatus(404);
  }
};


exports.offrId = async (req, res, next, offreId)=> {
  async function findEntretienOffress(id){
   
    const candidat = await Candidat.findByPk(id, {
      
      include: [
        {
          model: Offre,
           
          attributes: ["refoffre"],
          through: {
            attributes: ["CandidatId", "OffreId"],
          }
     
        },
      ],
    });
     
    return candidat;
     
  } 

next;
  try{
      const offre = await findEntretienOffress(offreId);
      console.log(offre);
      req.offre = offre;
      next(); // go to apiRouter.get('/employee/:employeeId')
  } catch(e) {
      console.log(e);
      res.sendStatus(404);
  }
};


exports.findAllCandidat = async (req, res, next)=> {
  async function findAllCandidats(){
   
    const candidats = await Candidat.findAll({
     
      include: [
        {
          model: Offre,
           
          attributes: ["refoffre","titre"],
         
          through: {
            attributes: ["CandidatId", "OffreId"],
          }
     
        },
      ],
    });
     
    return candidats;
  
    }
    next;
  try{
      const candidat = await findAllCandidats();
      res.status(200).json({candidats: candidat});
      next(); // go to apiRouter.get('/project/:projectId')
  } catch(e) {
      console.log(e);
      res.sendStatus(404);
  }
};

exports.candidId = async (req, res, next,candidatId)=>{
  async function findOffresCandidats(id){
   
    const offre= await Offre.findByPk(id, {
      
      include: [
        {
          model: Candidat,
           
          attributes: ["nom"],
          through: {
            attributes: ["CandidatId", "OffreId"],
          }
     
        },
      ],
    });
     
    return offre;
    
    }
    next;
  try {
      const candidat = await findOffresCandidats(candidatId);
      console.log(candidat);
      req.candidat = candidat;
      next();
  } catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
};


//ca marche _________________
exports.FindOffer = async (req,res)=>
{
  const id = req.params.id;
  const offer = await Offre.findByPk(id,{
    
    include: {
      model: Offre_candidat,
      include: [
        {
          model: Entretien,
          through: { attributes: ["entretienId" , "offreCandidatCandidatId"] }
        },
        Candidat
      ]
    }
    
    
  }).catch(err => {
    res.status(500).send({
      message: "Could not Find Offre with id=" + id
    });
  });
  res.status(200).json(offer);
  return offer;
  
};


exports.FindEntertien = (req,res)=>
{
  
  const id = req.params.entretienId;
  Entretien.findByPk({
    where: { id: id },

    include: {
      model: Offre_candidat,
      include: [
        {
          model: Offre,
          through: { attributes: [] } 
        },
       Fixe_entretien 
      ]
    }
  }).catch(err => {
    res.status(500).send({
      message: "Could not Find Offre with id=" + id
    });
  });

};