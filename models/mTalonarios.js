var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	sp_abm_talo: sp_abm_talo,
	del: del
}

function getAll(cb){
	conn("select *, CONVERT(varchar(13), talo.ta_alta, 103) as altaf, CONVERT(varchar(13), talo.ta_vence, 103) as vencef, "+
		"CASE WHEN talo.ta_activo = 'S' THEN 'Si' WHEN talo.ta_activo = 'N' THEN 'No' WHEN talo.ta_activo = 'E' THEN 'F/E' END as activotxt "+
		"from talo order by ta_id", cb);
}

function getById(id, cb){
	conn("select *, CONVERT(varchar(13), talo.ta_alta, 103) as altaf, CONVERT(varchar(13), talo.ta_vence, 103) as vencef, "+
		"SUBSTRING(talo.ta_user, 6, 2) as nro_caja "+
		"from talo where ta_id = "+id, cb);
}

function sp_abm_talo(o, cb){
	conn("sp_abm_talo '"+o.tipo+"', '"+o.desde+"', '"+o.hasta+"', '"+o.ultimo+"', '"+o.alta+"', '"+o.graba+o.caja+"', "+o.id+
		", '"+o.vence+"', '"+o.activo+"'", cb);
}

function del(id, cb){
	conn("DELETE FROM talo WHERE ta_id = "+id, cb);
}
