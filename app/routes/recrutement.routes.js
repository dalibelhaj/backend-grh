module.exports = app =>{
    const express =require('express');
    var router = express.Router();
    const recrutement = require("../controllers/recrutement.controller");
    
      
     
      // Create a record in the junction table Employee_project.
      
      router.post('/',recrutement.addOffreEmploye );
    
       // Get all employees and the projects they are working on using the junction table.
       
       router.get('/',recrutement.findAlloffre );
     
    // Get an employee projects
     
    router.param('offreId',recrutement.offrId);
       
     router.get('/offre/:offreId',  (req, res, next)=>{
        res.status(200).json(req.offre);
     });

     
    
    // Get all projects and the employees  working on them using the junction table.
       
    //router.get('/',recrutement.findAllEmploye); 
     
     // Get a project employees
      
     router.param('employeId', recrutement.employId);
       
       
     router.get('/employe/:employeId',  (req, res, next)=>{
        res.status(200).json( req.employe);
     });

     router.put('/offre/:offreId',recrutement.updatebyid);



     router.put('/change/:employeId/:offreId',recrutement.updateId);
     router.get('/change/:employeId/:offreId',recrutement.getRec);
     router.delete('/change/:employeId/:offreId',recrutement.delete);
     
     app.use('/api/recrutement', router); 
    
    };