const AtributoModel = require('../models/AtributoModel');


//TODO: antes de fazer o insert, verificar se o nome já existe, 
//se já existir, retornar o ID do nome existente
//Se não existir, fazer o insert e retornar o  id gerado 

async function insert(request, response){
    try{
        const atributos = request.body;
        for(const atributo of atributos){
            await AtributoModel.create(atributo);
        }
        response.status(201).json("Atributos inseridos com sucesso");
    } catch (error){
        response.status(400).json({error: error.message});
    }
}

async function insertSemResponse(request){
    try{
        const atributos = request.body;
        for(const atributo of atributos){
            await AtributoModel.create(atributo);
        }
        return;
    } catch (error){
        throw (error);
    }
}

async function getAtributoByNomeAtributoAndSensor(request){
    const SensorController = require('./SensorController');
    const SensorModel = require('../models/SensorModel');
    try{
        sensor = await SensorController.getSensorByNome(request);
        sensorId = sensor.id;
        
        const nomeAtributo = request.body.nome_atributo_sensor;
        const atributo = await AtributoModel.findOne({
            where: {nome: nomeAtributo},
            include: [{
                model: SensorModel,
                as: 'sensor',
                where: {id: sensorId}   
            }]
        });
        
        console.log(atributo.nome);
        return atributo;
    } catch (error){
        throw (error);
    } 
}

module.exports = {
    insert: insert,
    insertSemResponse: insertSemResponse,
    getAtributoByNomeAtributoAndSensor: getAtributoByNomeAtributoAndSensor
}