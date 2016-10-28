const cIndex = require('./controllers/cIndex');
const cBancos = require('./controllers/cBancos');
const cPlanDeCuentas = require('./controllers/cPlanDeCuentas');
const cCodigosEgreso = require("./controllers/cCodigosEgreso");
const cCodigosIngreso = require("./controllers/cCodigosIngreso");
const cMediosDePago = require('./controllers/cMediosDePago');

module.exports = function(app) {
	app.get('/', cIndex.getInicio);
	app.get('/error', cIndex.getError);
	// BANCOS
		app.get('/bancos/lista', cBancos.getLista);
		app.post('/bancos/nuevo', cBancos.postAlta);
		app.get('/bancos/modificar/:codigo', cBancos.getModificar);
		app.post('/bancos/modificar', cBancos.postModificar);
		app.get('/bancos/eliminar/:codigo', cBancos.getEliminar);
	// PLAN DE CUENTAS
		app.get('/plandecuentas/lista', cPlanDeCuentas.getLista);
		app.get('/plandecuentas/alta', cPlanDeCuentas.getAlta);
		app.post('/plandecuentas/alta', cPlanDeCuentas.postAlta);
		app.get('/plandecuentas/modificar/:cuenta', cPlanDeCuentas.getModificar);
		app.post('/plandecuentas/modificar', cPlanDeCuentas.postModificar);
		app.get('/plandecuentas/eliminar/:cuenta', cPlanDeCuentas.getEliminar);
	 	app.get("/plandecuentas/digitos", cPlanDeCuentas.getAjax_CantDigitosPorNivel);
	 	app.get("/plandecuentas/export", cPlanDeCuentas.getExport);
	// CODIGOS DE EGRESOS
		app.get("/codigosegreso/lista", cCodigosEgreso.getLista);
		app.get("/codigosegreso/alta", cCodigosEgreso.getAlta);
		app.post("/codigosegreso/alta", cCodigosEgreso.postAlta);
		app.get("/codigosegreso/modificar/:codigo", cCodigosEgreso.getModificar);
		app.post("/codigosegreso/modificar", cCodigosEgreso.postModificar);
		app.get("/codigosegreso/eliminar/:codigo", cCodigosEgreso.getEliminar);
	// CODIGOS DE INGRESOS
		app.get("/codigosingreso/lista", cCodigosIngreso.getLista);
		app.get("/codigosingreso/alta", cCodigosIngreso.getAlta);
		app.post("/codigosingreso/alta", cCodigosIngreso.postAlta);
		app.get("/codigosingreso/modificar/:codigo", cCodigosIngreso.getModificar);
		app.post("/codigosingreso/modificar", cCodigosIngreso.postModificar);
		app.get("/codigosingreso/eliminar/:codigo", cCodigosIngreso.getEliminar);
	// MEDIOS DE PAGO
		app.get("/mediosdepago/lista", cMediosDePago.getLista);
		app.get("/mediosdepago/alta", cMediosDePago.getAlta);
		app.post("/mediosdepago/alta", cMediosDePago.postAlta);
		app.get("/mediosdepago/modificar/:codigo", cMediosDePago.getModificar);
		app.post("/mediosdepago/modificar", cMediosDePago.postModificar);
		app.get("/mediosdepago/eliminar/:codigo", cMediosDePago.getEliminar);
}