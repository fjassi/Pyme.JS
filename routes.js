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
const cClientes = require('./controllers/cClientes');
const cAlicuotas = require('./controllers/cAlicuotas');
const cBancosPropios = require('./controllers/cBancosPropios');
const cChequeras = require('./controllers/cChequeras');
const cProveedores = require('./controllers/cProveedores');
const cPeriodos = require('./controllers/cPeriodos');
const cRecibos = require('./controllers/cRecibos');

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
		app.post('/plandecuentas/alta', cPlanDeCuentas.Sp_Alta_Cuen);
		app.get('/plandecuentas/modificar/:cuenta', cPlanDeCuentas.getModificar);
		app.post('/plandecuentas/modificar', cPlanDeCuentas.Sp_Alta_Cuen);
		app.get('/plandecuentas/eliminar/:cuenta', cPlanDeCuentas.getEliminar);
	 	app.get("/plandecuentas/digitos", cPlanDeCuentas.getAjax_CantDigitosPorNivel);
	 	app.get("/plandecuentas/export", cPlanDeCuentas.getExport);
	 	app.get("/plandecuentas/valcodigo/:codigo", cPlanDeCuentas.ValidarCodigo)
	// CODIGOS DE EGRESOS
		app.get("/codigosegreso/lista", cCodigosEgreso.getLista);
		app.get("/codigosegreso/alta", cCodigosEgreso.getAlta);
		app.post("/codigosegreso/alta", cCodigosEgreso.Sp_Abm_Coeg);
		app.get("/codigosegreso/modificar/:codigo", cCodigosEgreso.getModificar);
		app.post("/codigosegreso/modificar", cCodigosEgreso.Sp_Abm_Coeg);
		app.get("/codigosegreso/eliminar/:codigo", cCodigosEgreso.getEliminar);
		app.get("/codigosegreso/valcodigo/:codigo", cCodigosEgreso.ValidarCodigo);
	// CODIGOS DE INGRESOS
		app.get("/codigosingreso/lista", cCodigosIngreso.getLista);
		app.get("/codigosingreso/alta", cCodigosIngreso.getAlta);
		app.post("/codigosingreso/alta", cCodigosIngreso.Sp_Abm_Coin);
		app.get("/codigosingreso/modificar/:codigo", cCodigosIngreso.getModificar);
		app.post("/codigosingreso/modificar", cCodigosIngreso.Sp_Abm_Coin);
		app.get("/codigosingreso/eliminar/:codigo", cCodigosIngreso.getEliminar);
		app.get("/codigosingreso/valcodigo/:codigo", cCodigosIngreso.ValidarCodigo);
	// MEDIOS DE PAGO
		app.get("/mediosdepago/lista", cMediosDePago.getLista);
		app.get("/mediosdepago/alta", cMediosDePago.getAlta);
		app.post("/mediosdepago/alta", cMediosDePago.Sp_Abm_Mpagos);
		app.get("/mediosdepago/modificar/:codigo", cMediosDePago.getModificar);
		app.post("/mediosdepago/modificar", cMediosDePago.Sp_Abm_Mpagos);
		app.get("/mediosdepago/eliminar/:codigo", cMediosDePago.getEliminar);
		app.get("/centrodecostos/valcodigo/:codigo", cMediosDePago.ValidarCodigo);
	// DETERMINACION CODIGOS DE COMPROBANTES
		app.get("/codigoscomprobantes/lista", cCodigosComprobantes.getLista);
		app.get("/codigoscomprobantes/alta", cCodigosComprobantes.getAlta);
		app.post("/codigoscomprobantes/alta", cCodigosComprobantes.Abm_Dete);
		app.get("/codigoscomprobantes/modificar/:numero", cCodigosComprobantes.getModificar);
		app.post("/codigoscomprobantes/modificar", cCodigosComprobantes.Abm_Dete);
		app.get("/codigoscomprobantes/eliminar/:numero", cCodigosComprobantes.getEliminar);
		app.get("/codigoscomprobantes/valnumero/:numero", cCodigosComprobantes.ValidarNumero)
	// CONDICIONES DE VENTA
		app.get("/condicionesdeventa/lista", cCondicionesDeVenta.getLista);
		app.get("/condicionesdeventa/alta", cCondicionesDeVenta.getAlta);
		app.post("/condicionesdeventa/alta", cCondicionesDeVenta.Sp_Abm_Cove);
		app.get("/condicionesdeventa/modificar/:numero", cCondicionesDeVenta.getModificar);
		app.post("/condicionesdeventa/modificar", cCondicionesDeVenta.Sp_Abm_Cove);
		app.get("/condicionesdeventa/eliminar/:numero", cCondicionesDeVenta.getEliminar);
		app.get("/condicionesdeventa/valnumero/:numero", cCondicionesDeVenta.ValidarNumero);
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
	// CLIENTES
		app.get("/clientes/lista", cClientes.getLista);
		app.get("/clientes/alta", cClientes.getAlta);
		app.post("/clientes/alta", cClientes.sp_clientes);
		app.get("/clientes/modificar/:numero", cClientes.getModificar);
		app.post("/clientes/modificar", cClientes.sp_clientes);
		app.get("/clientes/eliminar/:numero", cClientes.getEliminar);
		app.get("/clientes/valnumero/:numero", cClientes.ValidarNumero);
		app.get("/clientes/valcuit/:cuit", cClientes.ValidarCuit);
	// ALICUOTAS
		app.get("/alicuotas/lista", cAlicuotas.getLista);
		app.get("/alicuotas/alta", cAlicuotas.getAlta);
		app.post("/alicuotas/alta", cAlicuotas.Sp_Abm_Alicuotas);
		app.get('/alicuotas/modificar/:codigo', cAlicuotas.getModificar);
		app.post('/alicuotas/modificar', cAlicuotas.Sp_Abm_Alicuotas);
		app.get('/alicuotas/eliminar/:codigo', cAlicuotas.getEliminar);
	// BANCOS PROPIOS
		app.get("/bancospropios/lista", cBancosPropios.getLista);
		app.get("/bancospropios/alta", cBancosPropios.getAlta);
		app.post("/bancospropios/alta", cBancosPropios.Sp_Abm_BancosPropios);
		app.get('/bancospropios/modificar/:codigo', cBancosPropios.getModificar);
		app.post('/bancospropios/modificar', cBancosPropios.Sp_Abm_BancosPropios);
		app.get('/bancospropios/eliminar/:codigo', cBancosPropios.getEliminar);
	// CHEQUERAS
		app.get("/chequeras/cuentas", cChequeras.getCuentas);
		app.post("/chequeras/cuentas", cChequeras.postCuentas);
		app.get("/chequeras/lista/:cuenta", cChequeras.getLista);
		app.get('/chequeras/eliminar/:cuenta/:id', cChequeras.getEliminar);
		app.get("/chequeras/alta/:cuenta", cChequeras.getAlta);
		app.post("/chequeras/alta", cChequeras.Sp_Abm_Chequeras);
	// PROVEEDORES
		app.get("/proveedores/lista", cProveedores.getLista);
		app.get("/proveedores/alta", cProveedores.getAlta);
		app.post("/proveedores/alta", cProveedores.sp_proveedores);
		app.get("/proveedores/eliminar/:numero", cProveedores.getEliminar);
		app.get("/proveedores/modificar/:numero", cProveedores.getModificar);
		app.post("/proveedores/modificar", cProveedores.sp_proveedores);
	// PERIODOS CONTABLES
		app.get("/periodoscontables/lista", cPeriodos.getLista);
		app.get("/periodoscontables/alta", cPeriodos.getAlta);
		app.post("/periodoscontables/alta", cPeriodos.Sp_Abm_Peri);
		app.get("/periodoscontables/ver/:fecha_desde", cPeriodos.getVer);
		app.get("/periodoscontables/eliminar/:fecha_desde", cPeriodos.getEliminar);
		app.get("/periodoscontables/modificar/:fecha_desde", cPeriodos.getModificar);
		app.post("/periodoscontables/modificar", cPeriodos.Sp_Abm_Peri);
	//RECIBOS
		app.get("/recibos/consulta", cRecibos.getConsulta);
		app.get("/recibos/filtroajax/:desde/:hasta/:cliente/:tipo", cRecibos.getFiltroAjax)
}