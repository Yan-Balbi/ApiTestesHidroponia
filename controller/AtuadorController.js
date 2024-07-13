const AtuadorModel = require('../models/AtuadorModel');


async function insert(request, response){
    try{
        const test = await AtuadorModel.create(request.body);
        response.status(201).json(test);
    } catch (error){
        response.status(400).json({error: error.message});
    }
}

async function getAtuadorByNome(request){
    // const atributoController = require('../controller/AtributoController');
    try{
        const nomeAtuador = request.body.nome_atuador;
        const atuador = await AtuadorModel.findOne({where: {nome: nomeAtuador}});
        return atuador;
    } catch (error){
        throw (error);
    } 
}

module.exports = {
    insert: insert,
    getAtuadorByNome: getAtuadorByNome
}