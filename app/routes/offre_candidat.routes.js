module.exports = app =>{
const express =require('express');
var router = express.Router();
const offre_candidat = require("../controllers/offre_candidat.controller");

  
 
  // Create a record in the junction table Employee_project.
  
  router.post('/',offre_candidat.addOffreCandidat );

   // Get all employees and the projects they are working on using the junction table.
   
   router.get('/',offre_candidat.findAlloffre );
 
// Get an employee projects
 
router.param('offreId',offre_candidat.offrId);
   
 router.get('/offre/:offreId',  (req, res, next)=>{
    res.status(200).json({offre: req.offre});
 });
 

// Get all projects and the employees  working on them using the junction table.
   
router.get('/',offre_candidat.findAllCandidat); 
 
 // Get a project employees
  
 router.param('candidatId', offre_candidat.candidId);
   
   
 router.get('/candidat/:candidatId',  (req, res, next)=>{
    res.status(200).json(req.candidat);
 });
 
 app.use('/api/offre-candidat', router); 

};
