use testes_hidroponia_bd;
SELECT * FROM conjunto_teste_componente;
SELECT * FROM sensor;
SELECT * FROM atributo;
SELECT * FROM atuador;
SELECT * FROM registro_dado_componente;
SELECT * FROM medicao_sensor;
SELECT * FROM medicao_atuador;

SELECT ms.valor_medido, s.nome, a.nome, rdc.data_hora
FROM medicao_sensor ms
JOIN atributo a ON ms.atributo_id = a.id
JOIN sensor s ON a.sensor_id = s.id
JOIN registro_dado_componente rdc ON ms.registro_dado_componente_id = rdc.id
JOIN conjunto_teste_componente ctc ON rdc.conjunto_teste_componente_id = ctc.id
WHERE a.nome = 'temperatura do ambiente'  -- replace with the desired attribute name
AND s.nome = 'DHT4'  -- replace with the desired sensor name
AND ctc.nome = 'testando temperaturaSensor DHT4';

SELECT MS.valor_medido, S.nome, A.nome, RDC.data_hora
FROM sensor S
JOIN atributo A ON S.id = A.sensor_id
JOIN medicao_sensor MS ON A.id = MS.atributo_id
JOIN registro_dado_componente RDC ON MS.registro_dado_componente_id = RDC.id
JOIN conjunto_teste_componente CTC ON RDC.conjunto_teste_componente_id = CTC.id
WHERE A.nome = 'temperatura do ambiente'  -- replace with the desired attribute name
AND S.nome = 'DHT4'  -- replace with the desired sensor name
AND CTC.nome = 'testando temperaturaSensor DHT4';

SELECT A.nome, MA.corrente, MA.tensao, RDC.data_hora
FROM atuador A
JOIN medicao_atuador MA ON A.id = MA.atuador_id
JOIN registro_dado_componente RDC ON MA.registro_dado_componente_id = RDC.id
JOIN conjunto_teste_componente CTC ON RDC.conjunto_teste_componente_id = CTC.id
WHERE CTC.nome = 'testando valores da bomba peristáltica';

drop database testes_hidroponia_bd;