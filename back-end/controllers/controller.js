const petshopModel = require('../models/petshop')
const precoModel = require('../models/preco')
const tipoCaoModel=require('../models/tipoCao')
const { Sequelize, Op, literal } = require('sequelize');

async function createPetshop(petshop){
    return await petshopModel.create(petshop);
}
async function createTipoCao(tipoCao){
    return await tipoCaoModel.create(tipoCao);
}
async function createPrecos(preco){
    return await precoModel.create(preco);
}

async function listPetshops(){
  const petshops = await petshopModel.findAll();
  return petshops;
}

async function listCaes(){
  const tiposcaes = await tipoCaoModel.findAll();
  return tiposcaes;
}
async function listprecos(){
  const precos = await precoModel.findAll();
  return precos;
}

async function getPetshop(id_pet){
  const petshop = await petshopModel.findOne({ where: { id: parseInt(id_pet)} });
  return petshop 
}


async function getMelhorPetshop(quantidadeCaesGrandes, quantidadeCaesPequenos, dataServico) {
  const diaSemana = obterDiaSemana(dataServico);
  const PrecoCalcula = diaSemana === 'sabado' || diaSemana === 'domingo' ? 'preco_fim_desemana' : 'preco_semana';

  const precos = await precoModel.findAll({
    attributes: ['petshop_id', 'preco_semana', 'preco_fim_desemana'],
    where: {
      TiposCaes_id: {
        [Op.in]: [1, 2],
      },
    },
  });

  let melhorPetshopId = null;
  let menorOrcamento = Number.MAX_SAFE_INTEGER;

  for (const preco of precos) {
    const { petshop_id } = preco;

    const orcamento = calcularOrcamento(PrecoCalcula, quantidadeCaesGrandes, quantidadeCaesPequenos, preco);
    
    if (orcamento < menorOrcamento) {
      menorOrcamento = orcamento;
      melhorPetshopId = petshop_id;
    }
  }

  const melhorPetshop = await getPetshop(melhorPetshopId);

  return {
    petshop_nome: melhorPetshop.nome_petshop,
    valor_total: menorOrcamento,
  };
}

function calcularOrcamento(PrecoCalcula, quantidadeCaesGrandes, quantidadeCaesPequenos, preco) {
  const precoCalculado = PrecoCalcula === 'preco_fim_desemana' ? preco.preco_fim_desemana : preco.preco_semana;
  const orcamentoGrandes = quantidadeCaesGrandes * precoCalculado;
  const orcamentoPequenos = quantidadeCaesPequenos * precoCalculado;
  return orcamentoGrandes + orcamentoPequenos;
}
  function obterDiaSemana(data) {
    const diasSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    const dia = new Date(data).getDay();
    return diasSemana[dia];
  }

  module.exports = { getMelhorPetshop,createPetshop,createTipoCao,createPrecos,listPetshops,listCaes,listprecos,getPetshop };