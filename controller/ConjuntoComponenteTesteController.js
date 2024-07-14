const ConjuntoTesteComponenteModel = require('../models/ConjuntoComponenteTesteModel');

function getAllTests(request, response){
    response.send(posts);
}


async function insertTest(request, response){
    try{
        const test = await ConjuntoTesteComponenteModel.create(request.body);
        response.status(201).json(test);
    } catch (error){
        response.status(400).json({error: error.message});
    }
}
async function getConjuntoTesteByNome(request){
    try{
        const nomeConjunto = request.body.nome_conjunto_teste;
        const conjuntoTeste = await ConjuntoTesteComponenteModel.findOne({where : {nome: nomeConjunto}});
        return conjuntoTeste;
    }catch(error){
        throw (error);
    }
}

module.exports = {
    getAllTests: getAllTests, 
    insertTest: insertTest,
    getConjuntoTesteByNome: getConjuntoTesteByNome
}