var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	Sp_Alta_Cuen: Sp_Alta_Cuen,
	getByCuenta: getByCuenta,
	del: del,
	validacionMovimientos: validacionMovimientos,
	getAllImputables: getAllImputables
}

function getAll(cb){
	conn("SELECT *, "+
		"case impu when 'N' then 'No' when 'S' then 'Si' end as imputxt, "+
		"case ajus when 'N' then 'No' when 'S' then 'Si' end as ajustxt, "+
		"case nivel "+
		"when '1' then nombre "+
		"when '2' then '  '+nombre "+
		"when '3' then '    '+nombre "+
		"when '4' then '      '+nombre "+
		"when '5' then '        '+nombre "+
		"when '6' then '          '+nombre "+
		"end as nombretxt "+
		"FROM cuen "+
		"ORDER BY cuenta asc", cb);
}

function Sp_Alta_Cuen(codigo, nombre, imputable, ajustable, nivel, cb){
	conn("Sp_Alta_Cuen '"+codigo+"', '"+nombre+"', '"+imputable+"', '"+ajustable+"', "+nivel+"", cb);
}

function getByCuenta(cuenta, cb){
	conn("SELECT *, "+
		"RTRIM(LTRIM(cuen.nombre)) as nombretrim, "+
		"case impu when 'N' then 'No' when 'S' then 'Si' end as imputxt, "+
		"case ajus when 'N' then 'No' when 'S' then 'Si' end as ajustxt, "+
		"case nivel "+
		"when '1' then nombre "+
		"when '2' then '  '+nombre "+
		"when '3' then '    '+nombre "+
		"when '4' then '      '+nombre "+
		"when '5' then '        '+nombre "+
		"when '6' then '          '+nombre "+
		"end as nombretxt "+
		"FROM cuen "+
		"WHERE cuen.cuenta = '"+cuenta+"'", cb);
}

function del(cuenta, cb){
	conn("DELETE FROM cuen WHERE cuenta = '"+cuenta+"'", cb);
}

function validacionMovimientos(cuenta, cb){
	conn("select top 1(ld_fecha) from diario where ld_debe = '"+cuenta+"' or ld_cred = '"+cuenta+"'", cb)
}

function getAllImputables(cb){
	conn("SELECT *, "+
		"case impu when 'N' then 'No' when 'S' then 'Si' end as imputxt, "+
		"case ajus when 'N' then 'No' when 'S' then 'Si' end as ajustxt "+
		"FROM cuen "+
		"WHERE cuen.impu = 'S' "+
		"ORDER BY cuenta asc", cb);
}