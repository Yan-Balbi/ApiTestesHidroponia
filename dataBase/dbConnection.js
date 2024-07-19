//Criação de conexão com o BD
const Sequelize = require('sequelize');
const sequelize = new Sequelize('testes_hidroponia_bd'/*nome do BD*/, 'teste_hidroponia_db'/*username*/, 'ps00seiquenaoda00'/*senha*/, {
    host: 'localhost',
    dialect: 'mysql'
});

//Código de autenticação ao BD
sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!");
}).catch(function(erro){
    console.log("Falha ao se conectar: "+ erro);
});

module.exports = sequelize;