var mChequeras = require('../models/mChequeras');
var mBancosPropios = require('../models/mBancosPropios');
const tools = require('../public/js/utils.js');

module.exports = {
	getCuentas: getCuentas,
	postCuentas: postCuentas,
	getLista: getLista,
	getAlta: getAlta,
	Sp_Abm_Chequeras: Sp_Abm_Chequeras,
	getEliminar: getEliminar
}

function getCuentas(req, res) {
	mBancosPropios.getAll(function (cuentas){
		res.render('chequeras_cuentas', {
			pagename: 'Elige una Cuenta',
			cuentas: cuentas
		});
	});
}

function getAlta(req, res){
	const params = req.params;
	const cuenta = params.cuenta;

	mBancosPropios.getAll(function(cuentas){
		res.render("chequeras_alta", {
			pagename: 'Nuevo Registro de Chequera',
			cuentas: cuentas,
			cuenta: cuenta
		});
	});
}

function Sp_Abm_Chequeras(req, res){
	var oMchequeras = req.body;
	var fechaHoy = tools.generateTodayDateYMD();
	oMchequeras.alta = fechaHoy;
	oMchequeras.baja = null;

	mChequeras.Sp_Abm_Chequeras(oMchequeras, function(){
		res.redirect("/chequeras/lista/"+encodeURIComponent(oMchequeras.cuenta));
	});
}

function postCuentas(req, res) {
	const params = req.body;
	var cuenta = params.cuenta;
	cuenta = encodeURIComponent(cuenta);

	res.redirect('/chequeras/lista/'+cuenta);
}

function getLista(req, res) {
	const params = req.params;
	const cuenta = params.cuenta;


	mChequeras.getAll_ByCuenta(cuenta, function (chequeras){
  		res.render('chequeras_lista', {
				pagename: 'Lista de Chequeras de '+cuenta,
				chequeras: chequeras,
				cuenta: cuenta
		});
  });
}

function getEliminar(req, res){
	const params = req.params;
	const id = params.id;
	var cuenta = params.cuenta;
	cuenta = encodeURIComponent(cuenta);
	
	mChequeras.del(id, function(){
		res.redirect('/chequeras/lista/'+cuenta);
	});
}

