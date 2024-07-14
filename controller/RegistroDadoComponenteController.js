const RegistroDadoComponenteModelModel = require('../models/RegistroDadoComponenteModel.js');
const AtributoController = require('./AtributoController.js');
const SensorController = require('./SensorController.js');

async function insertRegistroDado(request, response){
    try{
        const test = await RegistroDadoComponenteModelModel.create(request.body);
        response.status(201).json(test);
    } catch (error){
        response.status(400).json({error: error.message});
    }
}

async function insertRegistroDadoSemResponse(request){//Não alterar
    try{
        const registroDado = await RegistroDadoComponenteModelModel.create(request);
        return registroDado;
    } catch (error){
        throw (error);
    }
}

async function insertMedicaoSensor(request, response){
    try{
        const atributo = await AtributoController.getAtributoByNomeAtributoAndSensor(request);
        
        const ConjuntoComponenteTesteController = require('./ConjuntoComponenteTesteController.js');

        conjuntoTeste = await ConjuntoComponenteTesteController.getConjuntoTesteByNome(request);
        conjuntoTesteId = conjuntoTeste.id;

        const requestRegistroDado = {
            conjunto_teste_componente_id: conjuntoTesteId
        }

        const registroDado = await insertRegistroDadoSemResponse(requestRegistroDado);
        valorMedido = request.body.valor_medido;
        const requestAtualizada = {
            valor_medido: valorMedido,
            atributo_id: atributo.id,
            registro_dado_componente_id: registroDado.id
            
        };
        const MedicaoSensorModel = require('../models/MedicaoSensorModel.js');
        await MedicaoSensorModel.create(requestAtualizada);

        response.status(200).json("Medicao registrada");
    } catch (error){
        response.status(400).json({error: error.message});
    }
}

async function insertMedicaoAtuador(request, response){
    try{
        const ConjuntoComponenteTesteController = require('./ConjuntoComponenteTesteController.js');

        const correnteMedida = request.body.corrente_medida;
        const tensaoMedida = request.body.tensao_medida;
        const estado = request.body.estado;
        
        const AtuadorController = require('./AtuadorController.js');
        const atuador = await AtuadorController.getAtuadorByNome(request);

        conjuntoTeste = await ConjuntoComponenteTesteController.getConjuntoTesteByNome(request);
        conjuntoTesteId = conjuntoTeste.id;

        const requestRegistroDado = {
            conjunto_teste_componente_id: conjuntoTesteId
        }

        const registroDado = await insertRegistroDadoSemResponse(requestRegistroDado);
        valorMedido = request.body.valor_medido;
        requestAtualizada = {
            corrente: correnteMedida,
            tensao: tensaoMedida,
            estado: estado,
            atuador_id: atuador.id,
            registro_dado_componente_id: registroDado.id
        }

        const MedicaoAtuadorModel = require('../models/MedicaoAtuadorModel.js');
        await MedicaoAtuadorModel.create(requestAtualizada);
        
        response.status(200).json("Medicao registrada");
    } catch (error){
        response.status(400).json({error: error.message});
    }
}

module.exports = {
    insertRegistroDado: insertRegistroDado,
    insertMedicaoSensor: insertMedicaoSensor,
    insertMedicaoAtuador: insertMedicaoAtuador
}