module.exports = app =>{
    const express =require('express');
    var router = express.Router();
    const role = require("../controllers/role.controller");
    

    router.get('/',role.findAllrole); 
     

     
     app.use('/api/roles', router); 
    
    };
    