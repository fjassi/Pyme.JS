var mBancosPropios = require('../models/mBancosPropios');
var mPlanDeCuentas = require('../models/mPlanDeCuentas');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	Sp_Abm_BancosPropios: Sp_Abm_BancosPropios,
	getModificar: getModificar,
	getEliminar: getEliminar
}

function getLista(req, res) {
	mBancosPropios.getAll(function (bancospropios){
		res.render('bancospropios_lista', {
			pagename: 'Archivo de Bancos Propios',
			bancospropios: bancospropios
		});
	});
}

function getAlta(req, res){
	mPlanDeCuentas.getAllImputables(function(imputables){
		mCentroDeCostos.getNextCodigo(function(nextcodigo){
			res.render("centrodecostos_alta", {
				pagename: "Alta de Centro de Costo",
				imputables: imputables,
				nextcodigo: nextcodigo[0].proximo_codigo
			});
		});
	});
}

function getAlta(req, res){
	mPlanDeCuentas.getAllImputables(function(imputables){
			res.render("bancospropios_alta", {
			pagename: "Alta de Bancos Propios",
			imputables: imputables 
		});
	});	
}

function Sp_Abm_BancosPropios(req, res){
	var oBancosPropios = req.body;
	// oBancosPropios.cu_banco = oBancosPropios.cu_banco.toUpperCase();
	
	mBancosPropios.Sp_Abm_Ctas(oBancosPropios, function(){
		res.redirect('/bancospropios/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const codigo = params.codigo;

	mBancosPropios.getByCodigo(codigo, function(bancospropios){
		mPlanDeCuentas.getAllImputables(function(imputables){
			res.render('bancospropios_modificar', {
				pagename: 'Modificar Informacion de Bancos Propios',
				bancospropios: bancospropios[0],
				imputables: imputables
			});
		});
	});	
}

function getEliminar(req, res){
	const params = req.params;
	const cu_nume = params.cu_nume;

	// verificar movimientos
	mBancosPropios.validacionMovimientos(cu_nume, function(movimientos){
		if (movimientos.length > 0){
			res.render("error", {
				error: "No se puede eliminar este Banco porque tiene movimientos."
			});
		}else{
			mBancosPropios.del(cu_nume, function(){
				res.redirect('/bancospropios/lista');
			});
		}
	});
	
}
