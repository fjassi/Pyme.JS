var conn = require('../config/db').conn;

module.exports = {
	getFiltro: getFiltro,
	getNumeroTalonario: getNumeroTalonario,
	Ordenes_op1: Ordenes_op1,
	Ordenes_op2: Ordenes_op2,
	Ordenes_op3: Ordenes_op3,
	delOp1: delOp1,
	delOp2: delOp2,
	delOp3: delOp3
}

function getFiltro(query, cb){
	conn(query, cb);
}

function getNumeroTalonario(cb){
	conn("select distinct(o1_sucu) from opa1 order by o1_sucu", cb);
}

function Ordenes_op1(numero, cb){
	conn("select top 1 *, CONVERT(char, o1_fecha, 103) as xfecha from Opa1 where o1_nume = "+numero, cb);
}

function Ordenes_op2(numero, cb){
	conn("select *, CONVERT(char, o2_fecha, 103) as xfecha from Opa2 where o2_nume = "+numero, cb);
}

function Ordenes_op3(numero, cb){
	conn("select opa3.*, CONVERT(char, o3_feva, 103) as xfecha, mpagos.nombre from opa3 left join mpagos on mpagos.codigo = opa3.o3_tipo where o3_nume = "+numero, cb);
}

function delOp1(numero, cb){
	conn("delete from opa1 where o1_nume = " + numero, cb);
}

function delOp2(numero, cb){
	conn("delete from opa2 where o2_nume = " + numero, cb);
}

function delOp3(numero, cb){
	conn("delete from opa3 where o3_nume = " + numero, cb);
}