const { request } = require('express');
const SensorModel = require('../models/SensorModel');
const AtributoModel = require('../models/AtributoModel');


//TODO: antes de fazer o insert, verificar se o nome já existe, 
//se já existir, retornar o ID do nome existente
//Se não existir, fazer o insert e retornar o  id gerado 

async function insert(request, response){
    try{
        const sensor = await SensorModel.create(request.body);
        response.status(201).json(sensor);
    } catch (error){
        response.status(400).json({error: error.message});
    }
}

async function insertSemResponse(request){
    try{
        const sensor = await SensorModel.create(request);
        return sensor
    } catch (error){
        throw(error);
    }
}

async function getSensorByNome(request){
    const atributoController = require('../controller/AtributoController');
    try{
        const nomeSensor = request.body.nome_sensor;
        const sensor = await SensorModel.findOne({where: {nome: nomeSensor}});
        //console.log(sensor.nome);
        return sensor;
    } catch (error){
        throw (error);
    } 
}

async function existeSensorEAtributos(request){
    if((await existeSensor(request) == null) && (await existeAtributos(request) == false)){
        return false;
    }
    return true;
}

async function existeSensor(request){
    try{
        const nomeSensor = request.body.nome;
        const sensor = await SensorModel.findOne({where: {nome: nomeSensor}});
        return sensor;
    } catch (error){
        throw (error);
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

/*async function insertSensorComAtributos(request, response){
    try{
        const { nome, atributos} = request.body;
        await insert(request, response);

        const sensor = await getSensorByNome(nome);
        //if(!sensor) {
            //sensor = sensorController.insert(nome);
        //}
        const sensorId = sensor.nome;
        console.log(sensorId);
        const atributosWithSensorId = atributos.map(atributo => ({ ...atributo, sensor_id: sensorId }));

        const atributosRequest = {body: atributosWithSensorId};
        await atributoController.insert(atributosRequest, response);
        response.status(201).json("Sensor e Atributos inseridos com sucesso!");
    } catch (error){
        response.status(400).json({error: error.message});
    }
}*/

    //o response não pode aparecer mais de 2 vezes
   async function insertSensorComAtributos(request, response){
    try{
        if(await existeSensorEAtributos(request) == false){
            const atributoController = require('../controller/AtributoController');
            const { nome, atributos} = request.body;
            //const sensor = await SensorModel.create({ nome });
            const sensor = await insertSemResponse({nome});
            const sensorId = sensor.id;

            const atributosWithSensorId = atributos.map(atributo => ({...atributo, sensor_id: sensorId }));

            const atributosRequest = {body: atributosWithSensorId};
            //await atributoController.insert(atributosRequest, response);
            await atributoController.insertSemResponse(atributosRequest);
            response.status(201).json("Sensor e Atributos inseridos com sucesso!");
        } else {
            response.status(409).json({conflict: "Cadastro de sensor e atributos cancelado: há dados já inseridos no BD. "});
        }
    } catch (error){
        response.status(400).json({error: error.message});
    }
}

module.exports = {
    insert: insert,
    insertSensorComAtributos: insertSensorComAtributos,
    getSensorByNome: getSensorByNome
}