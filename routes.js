const cIndex = require('./controllers/cIndex');
const cBancos = require('./controllers/cBancos');
const cPlanDeCuentas = require('./controllers/cPlanDeCuentas');

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
		
}