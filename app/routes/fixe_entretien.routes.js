module.exports = app =>{
const express = require('express');
var router = express.Router();
const fixe_entretien = require("../controllers/fixe_entretien.controller");

router.post('/',fixe_entretien.addEntretien);

router.get('/',fixe_entretien.findAll);

router.get('/:id',fixe_entretien.FindOffer);

router.get('/entretien/:id',fixe_entretien.FindEntertien);

app.use('/api/fixe_entretien',router);

}