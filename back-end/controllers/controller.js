const petshopModel = require('../models/petshop')
const precoModel = require('../models/preco')
const tipoCaoModel=require('../models/tipoCao')

const {Op} = require("sequelize")

async function createPetshop(petshop){
    return await petshopModel.create(petshop);
}
async function createTipoCao(tipoCao){
    return await tipoCaoModel.create(tipoCao);
}
async function createPrecos(preco){
    return await precoModel.create(preco);
}

async function encontrarMelhorPetshop(quantidadeCaesGrandes, quantidadeCaesPequenos, dataServico) {
    const diaSemana = obterDiaSemana(dataServico);
    const tipoDia = diaSemana === 'sabado' || diaSemana === 'domingo' ? 'fim_de_semana' : 'dia_util';
  
    const petshops = await petshopModel.findAll({
      include: [{
        model: precoModel,
        where: {
          [Op.or]: [
            { dia_semana: tipoDia }
          ]
        },
        include: [{
          model: tipoCaoModel,
          where: {
            [Op.or]: [
              { tipo: 'grande', quantidade: quantidadeCaesGrandes },
              { tipo: 'pequeno', quantidade: quantidadeCaesPequenos }
            ]
          }
        }]
      }]
    });
}
  
  function obterDiaSemana(data) {
    const diasSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    const dia = new Date(data).getDay();
    return diasSemana[dia];
  }
  
  function calcularPrecoTotal(preco, quantidadeCaesGrandes, quantidadeCaesPequenos) {

    return precoTotal;
  }
  
  module.exports = { encontrarMelhorPetshop,createPetshop,createTipoCao,createPrecos };