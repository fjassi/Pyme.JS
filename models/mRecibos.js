var conn = require('../config/db').conn;

module.exports = {
	getFiltro: getFiltro,
	Recibos_rec1: Recibos_rec1,
	Recibos_rec2: Recibos_rec2,
	Recibos_rec3: Recibos_rec3,
	delRec1: delRec1,
	delRec2: delRec2,
	delRec3: delRec3
}

function getFiltro(query, cb){
	conn(query, cb);
}

function Recibos_rec1(numero, cb){
	conn("select top 1 rec1.* , clientes.cl_apel, CONVERT(char, Rec1.r1_fecha, 103) as fechaf from rec1 "+
		"left join clientes on clientes.cl_nume=rec1.r1_clie "+
		"where r1_nume= "+numero+" and r1_talo = 1 ", cb);
}

function Recibos_rec2(numero, cb){
	conn("select rec2.* , mpagos.nombre, CONVERT(char, Rec2.r2_feva, 103) as fechaf, "+
		"(select sum(r2_impor) from rec2 left join mpagos on mpagos.codigo=rec2.r2_tipo where r2_nume = "+numero+" and r2_talo = 1) as total "+
		"from rec2 left join mpagos on mpagos.codigo=rec2.r2_tipo "+
 		"where r2_nume = "+numero+" and r2_talo = 1", cb);
}

function Recibos_rec3(numero, cb){
	conn("select * from rec3 where r3_nume = "+numero+" and r3_talo = 1", cb);
}

function delRec1(numero, cb){
	conn("delete from rec1 where r1_nume = " + numero, cb);
}

function delRec2(numero, cb){
	conn("delete from rec2 where r2_nume = " + numero, cb);
}

function delRec3(numero, cb){
	conn("delete from rec3 where r2_nume = " + numero, cb);
}
