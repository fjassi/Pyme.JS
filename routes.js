const cIndex = require('./controllers/cIndex');
const cBancos = require('./controllers/cBancos');
const cPlanDeCuentas = require('./controllers/cPlanDeCuentas');
const cCodigosEgreso = require("./controllers/cCodigosEgreso");
const cCodigosIngreso = require("./controllers/cCodigosIngreso");
const cMediosDePago = require('./controllers/cMediosDePago');
const cCodigosComprobantes = require('./controllers/cCodigosComprobantes');
const cCondicionesDeVenta = require('./controllers/cCondicionesDeVenta');
const cTalonarios = require('./controllers/cTalonarios');
const cCentroDeCostos = require('./controllers/cCentroDeCostos');
const cTipoDeCostos = require('./controllers/cTipoDeCostos');

module.exports = function(app) {
	app.get('/', cIndex.getInicio);
	app.get('/error', cIndex.getError);
	// BANCOS
		app.get('/bancos/lista', cBancos.getLista);
		app.get('/bancos/alta', cBancos.getAlta);
		app.post('/bancos/alta', cBancos.Sp_Abm_Bancos);
		app.get('/bancos/modificar/:codigo', cBancos.getModificar);
		app.post('/bancos/modificar', cBancos.Sp_Abm_Bancos);
		app.get('/bancos/eliminar/:codigo', cBancos.getEliminar);
		app.get('/bancos/valcodigo/:codigo', cBancos.ValidarCodigo);
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
	// DETERMINACION CODIGOS DE COMPROBANTES
		app.get("/codigoscomprobantes/lista", cCodigosComprobantes.getLista);
		app.get("/codigoscomprobantes/alta", cCodigosComprobantes.getAlta);
		app.post("/codigoscomprobantes/alta", cCodigosComprobantes.postAlta);
		app.get("/codigoscomprobantes/modificar/:numero", cCodigosComprobantes.getModificar);
		app.post("/codigoscomprobantes/modificar", cCodigosComprobantes.postModificar);
		app.get("/codigoscomprobantes/eliminar/:numero", cCodigosComprobantes.getEliminar);
	// CONDICIONES DE VENTA
		app.get("/condicionesdeventa/lista", cCondicionesDeVenta.getLista);
		app.get("/condicionesdeventa/alta", cCondicionesDeVenta.getAlta);
		app.post("/condicionesdeventa/alta", cCondicionesDeVenta.Sp_Abm_Cove);
		app.get("/condicionesdeventa/modificar/:numero", cCondicionesDeVenta.getModificar);
		app.post("/condicionesdeventa/modificar", cCondicionesDeVenta.Sp_Abm_Cove);
		app.get("/condicionesdeventa/eliminar/:numero", cCondicionesDeVenta.getEliminar);
		app.get("/condicionesdeventa/valnumero/:numero", cCondicionesDeVenta.ValidarNumero)
	// ==================================================================>>>>>>>>>>>>> a partir de acá, POO <<<<<<<<<<<<<<=======
	// TALONARIOS DE COMPROBANTES
		app.get("/talonarios/lista", cTalonarios.getLista);
		app.get("/talonarios/alta", cTalonarios.getAlta);
		app.post("/talonarios/alta", cTalonarios.sp_abm_talo);
		app.get("/talonarios/modificar/:id", cTalonarios.getModificar);
		app.post("/talonarios/modificar", cTalonarios.sp_abm_talo);
		app.get("/talonarios/eliminar/:id", cTalonarios.getEliminar);
	// CENTRO DE COSTOS
		app.get("/centrodecostos/lista", cCentroDeCostos.getLista);
		app.get("/centrodecostos/alta", cCentroDeCostos.getAlta);
		app.post("/centrodecostos/alta", cCentroDeCostos.sp_abm_talo);
		app.get("/centrodecostos/modificar/:numero", cCentroDeCostos.getModificar);
		app.post("/centrodecostos/modificar", cCentroDeCostos.sp_abm_talo);
		app.get("/centrodecostos/eliminar/:numero", cCentroDeCostos.getEliminar);
		app.get("/centrodecostos/valnumero/:numero", cCentroDeCostos.ValidarNumero);
	// TIPO DE COSTOS
		app.get("/tipodecostos/lista", cTipoDeCostos.getLista);
		app.get("/tipodecostos/alta", cTipoDeCostos.getAlta);
		app.post("/tipodecostos/alta", cTipoDeCostos.Sp_Abm_Tipc);
		app.get("/tipodecostos/modificar/:numero", cTipoDeCostos.getModificar);
		app.post("/tipodecostos/modificar", cTipoDeCostos.Sp_Abm_Tipc);
		app.get("/tipodecostos/eliminar/:numero", cTipoDeCostos.getEliminar);
		app.get("/tipodecostos/valnumero/:numero", cTipoDeCostos.ValidarNumero);
}