const express = require('express')
const router = express.Router()
const Controller = require("../controllers/controller")

router.post('/cadastro/petshop', (req, res) => {
       console.log(req.body.id)
       console.log(req.body.nome)
       console.log(req.body.distancia_km)
      Controller.createPetshop({
      id:req.body.id,
      nome_petshop: req.body.nome,
      distancia_km: req.body.distancia_km
    }).then((Petshops) => res.send(Petshops))
      .catch((err) => {
        console.log('Erro no cadastro do item', JSON.stringify(err))
        return res.status(400).send(err)
      })
  })
  module.exports = router