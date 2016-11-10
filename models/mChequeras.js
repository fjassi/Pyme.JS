var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	Sp_Abm_Chequeras: Sp_Abm_Chequeras,
	getAll_ByCuenta: getAll_ByCuenta,
	del: del
}

function getAll(cb){
	conn("select * from chequeras order by codigo", cb);
}

function Sp_Abm_Chequeras(o, cb){
	conn("Sp_Abm_Chequeras '"+o.cuenta+"', '"+o.desde+"', '"+o.hasta+"', '"+o.alta+"', "+o.baja+", "+o.idche, cb);
}

function getAll_ByCuenta(cuenta, cb){
	conn("select *, rtrim(ltrim(chequeras.cuenta)) as cuentatxt, (CONVERT(VARCHAR(10),chequeras.alta,103)) as alta_txt, "+
			"(convert(int, rtrim(ltrim(chequeras.hasta))) - convert(int, rtrim(ltrim(chequeras.desde)))) as total_cheques, "+
			"(select count(*) from cheques where ch_cta = chequeras.cuenta and ch_numero between chequeras.desde and chequeras.hasta) "+
			"as usados, (convert(int, rtrim(ltrim(chequeras.hasta))) - convert(int, rtrim(ltrim(chequeras.desde)))) - (select count(*) "+
			"from cheques where ch_cta = chequeras.cuenta and ch_numero between chequeras.desde and chequeras.hasta) as restan from chequeras where cuenta = '"+ cuenta +"' order by alta", cb);
}

function del(id, cb){
	conn("DELETE FROM chequeras WHERE idche = "+id, cb);
}