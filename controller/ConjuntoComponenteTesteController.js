const ConjuntoTesteComponenteModel = require('../models/ConjuntoComponenteTesteModel');

function getAllTests(request, response){
    const posts = "Componente: motor <br> n° teste: 1<br> corrente: 0.5 A <br> tensao 5v <br> data e hora: 26/06/2024 - 17:32<br>================<br>Componente: misturador <br> n° teste: 2<br> corrente: 0.36 A <br> tensao 9v <br> data e hora: 26/06/2024 - 18:00";
    
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

module.exports = {
    getAllTests: getAllTests, 
    insertTest: insertTest  
}