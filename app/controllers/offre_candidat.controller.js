const db = require("../models");
const Offre = db.offres;
const Candidat = db.candidats;
const Offre_candidat = db.offre_candidats;

  exports.addOffreCandidat = async (req, res, next)=>{
    async function junctionCreate(CandidatId, OffreId) {
  
      const offre_candidat = await Offre_candidat.create( { CandidatId, OffreId });
          
       return offre_candidat;
       
       
      }
      next;
    try{
        const candidatId = req.body.CandidatId;
        const offreId = req.body.OffreId;
        console.log(candidatId);
        console.log(offreId);
         
              if (!candidatId || !offreId) {
                return res.sendStatus(400);
             }
   
        const offrecandidat =  await junctionCreate(candidatId, offreId).then(() => res.json({ message: 'Offre candidat created.' }));
          
          
   
    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }
 };





exports.findAlloffre = async (req, res, next)=>{
  async function findAllOffres(){
  
    const offres= await Offre.findAll({
      
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
     
    return offres;
    
    }
    next;
  try {
      const offre = await findAllOffres();
      res.status(200).json(offre);
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
           
          // attributes: ["nom"],
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










 
   


  