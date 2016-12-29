var conn = require('../config/db').conn;

module.exports = {
	getFiltro: getFiltro,
	Recibos_rec1: Recibos_rec1,
	Recibos_rec2: Recibos_rec2,
	Recibos_rec3: Recibos_rec3,
	getByNumero: getByNumero
}

function getFiltro(query, cb){
	conn(query, cb);
}

function Recibos_rec1(numero, cb){
	conn("select top 1 rec1.* , clientes.cl_apel, CONVERT(char, Rec1.r1_fecha, 101) as fechaf from rec1 "+
		"left join clientes on clientes.cl_nume=rec1.r1_clie "+
		"where r1_nume= "+numero+" and r1_talo = 1 ", cb);
}

function Recibos_rec2(numero, cb){
	conn("select rec2.* , mpagos.nombre, CONVERT(char, Rec2.r2_feva, 101) as fechaf, "+
		"(select sum(r2_impor) from rec2 left join mpagos on mpagos.codigo=rec2.r2_tipo where r2_nume = "+numero+" and r2_talo = 1) as total "+
		"from rec2 left join mpagos on mpagos.codigo=rec2.r2_tipo "+
 		"where r2_nume = "+numero+" and r2_talo = 1", cb);
}

function Recibos_rec3(numero, cb){
	conn("select * from rec3 where r3_nume = "+numero+" and r3_talo = 1", cb);
}

function getByNumero(numero, cb){
	conn("select CONVERT(char, Rec1.r1_fecha, 101) as Fecha, Rec1.r1_talo as Talon, Rec1.r1_nume as Numero, Rec1.r1_clie as cliente, "+
		"clientes.Cl_apel as Apellido, rec1.r1_total as Total, Rec1.r1_movi as Movim from rec1 inner join clientes "+
		"on rec1.r1_clie = clientes.cl_nume where r1_nume = "+numero, cb)
}