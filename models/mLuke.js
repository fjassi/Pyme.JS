var conn = require('../config/db').conn;

module.exports = {
	getCantDigitosPorNivel: getCantDigitosPorNivel
}

function getCantDigitosPorNivel(cb){
	conn("select nivel1, nivel2, nivel3, nivel4, nivel5, nivel6, "+
		"nivel1 as cant1, "+
		"nivel1+nivel2 as cant2, "+
		"nivel1+nivel2+nivel3 as cant3, "+
		"nivel1+nivel2+nivel3+nivel4 as cant4, "+
		"nivel1+nivel2+nivel3+nivel4+nivel5 as cant5, "+
		"nivel1+nivel2+nivel3+nivel4+nivel5+nivel6 as cant6 "+
		"from luke", cb);
}

