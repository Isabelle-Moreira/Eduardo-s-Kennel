const express = require('express')
const router = express.Router()
const Controller = require("../controllers/controller")

router.post('/cadastro/petshop', (req, res) => {
      Controller.createPetshop({
      id:req.body.id,
      nome_petshop: req.body.nome,
      distancia_km: req.body.distancia_km
    }).then((Petshops) => res.send(Petshops))
      .catch((err) => {
        console.log('Erro no cadastro do petshop', JSON.stringify(err))
        return res.status(400).send(err)
      })
  })

  router.post('/cadastro/TipoCao', (req, res) => {
   Controller.createTipoCao({
   id:req.body.id,
   tipo: req.body.tipo
 }).then((TiposCaes) => res.send(TiposCaes))
   .catch((err) => {
     console.log('Erro no cadastro do tipo de cao', JSON.stringify(err))
     return res.status(400).send(err)
   })
})

router.post('/cadastro/precos', (req, res) => {
  Controller.createPrecos({
  id:req.body.id,
  petshop_id: req.body.id_petshop,
  TiposCaes_id: req.body.id_TipoCao,
  preco_semana:req.body.preco_semana,
  preco_fim_desemana:req.body. preco_fim_desemana
}).then((Precos) => res.send(Precos))
  .catch((err) => {
    console.log('Erro no cadastro do tipo de cao', JSON.stringify(err))
    return res.status(400).send(err)
  })
})



  module.exports = router