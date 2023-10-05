const express =require("express");
const router = express.Router();
const FormulaireService = require("../services/formulaire/formulaireService")

router.post("/ajouterunformulaire", async(req, res)=>{
try{
const form =  await FormulaireService.createForm(req.body)
if (!form.error) {
    res
      .status(201)
      .json({
        error: false,
        message: "Le formulaire a ajoutée avec succes",
        result: form,
      });
  } else {
    res.status(400).json(form);
  }
}catch(error){
    console.error(
        "Une erreur s'est produite lors de l'ajout du formulaire",
        error
      );
      res
        .status(500)
        .json("Une erreur s'est produite lors de l'ajout du formulaire");
}



})
module.exports = router;
