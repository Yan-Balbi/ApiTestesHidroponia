const AtributoModel = require('../models/AtributoModel');


//TODO: antes de fazer o insert, verificar se o nome já existe, 
//se já existir, retornar o ID do nome existente
//Se não existir, fazer o insert e retornar o  id gerado 

async function insertById(request, response){
    try{
        if(await existeAtributos(request) == false){
            const atributos = request.body.atributos;
            const sensorId = request.body.sensor_id;
            for(const atributo of atributos){
                novaRequest = {
                    nome: atributo.nome,
                    sensor_id: sensorId
                }
                // console.log(novaRequest);
                await AtributoModel.create(novaRequest);
            }
            response.status(201).json("Atributos inseridos com sucesso");
        } else {
            response.status(409).json({error:"Há atributos já inseridos no BD."});
        }
    } catch (error){
        response.status(400).json({error: error.message});
    }
}

async function insertByNome(request, response){
    const SensorController = require('./SensorController');
    const SensorModel = require('../models/SensorModel');
    try{
        console.log(await existeAtributos(request));
        if(await existeAtributos(request) == false){
            const atributos = request.body.atributos;
            const sensor = await SensorController.getSensorByNome(request);
            const sensorId = sensor.id;
            for(const atributo of atributos){
                novaRequest = {
                    nome: atributo.nome,
                    sensor_id: sensorId
                }
                //console.log(novaRequest);
                await AtributoModel.create(novaRequest);
            }
            response.status(201).json("Atributos inseridos com sucesso");
        } else {
            response.status(409).json({error: "Há atributos já inseridos no BD."});
        }
    } catch (error){
        response.status(400).json({error: error.message});
    }
}

async function existeAtributos(request){
    const AtributoModel = require('../models/AtributoModel');
    try{
        const nomesAtributos = request.body.atributos.map(atributo => atributo.nome);
        console.log(nomesAtributos);
        for(const nome of nomesAtributos){
            if(await AtributoModel.findOne({where: {nome: nome}})){
                return true;
            }
        }
        return false;
    } catch (error){
        throw (error);
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
    insertById: insertById,
    insertByNome: insertByNome,
    insertSemResponse: insertSemResponse,
    getAtributoByNomeAtributoAndSensor: getAtributoByNomeAtributoAndSensor
}