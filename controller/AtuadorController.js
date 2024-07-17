const AtuadorModel = require('../models/AtuadorModel');


async function insert(request, response){
    try{
        if(await existeAtuador(request) == null){
            const test = await AtuadorModel.create(request.body);
            response.status(201).json(test);
        } else {
            response.status(409).json({conflict: "Cadastro de atuador cancelado: dado já cadastrado no BD"});
        }
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

async function existeAtuador(request){
    try{
        const nomeAtuador = request.body.nome;
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