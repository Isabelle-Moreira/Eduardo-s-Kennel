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


router.get('/lista/petshops', (req, res, next) => {
  Controller.listPetshops().then((petshops) => res.send(petshops))
  .catch((err) => {
    console.log('Erro na consulta', JSON.stringify(err))
    return res.send(err)
  });
});


router.get('/lista/tiposcaes', (req, res, next) => {
  Controller.listCaes().then((tipos) => res.send(tipos))
  .catch((err) => {
    console.log('Erro na consulta', JSON.stringify(err))
    return res.send(err)
  });
});


router.get('/lista/precos', (req, res, next) => {
  Controller.listprecos().then((precos) => res.send(precos))
  .catch((err) => {
    console.log('Erro na consulta', JSON.stringify(err))
    return res.send(err)
  });
});

router.get('/petshop/instancia/:id', (req, res, next) => {
  Controller.getPetshop(req.params.id)
    .then((petshop) => {
      res.send(petshop);
    })
    .catch((err) => {
      console.log('Erro na consulta', JSON.stringify(err));
      return res.status(500).send({ error: 'Erro na consulta' });
    });
});

router.post('/orcamento', async (req, res) => {
  try {
    const melhorPetshop = await Controller.getMelhorPetshop(
      req.body.qtdCaesGrandes,
      req.body.qtdCaesPequenos,
      req.body.dataBanho
    );
    res.send(melhorPetshop);
  } catch (err) {
    console.error('Erro no cadastro do item', JSON.stringify(err));
    res.status(400).send(err);
  }
});

  module.exports = router