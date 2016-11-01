var mBancos = require('../models/mBancos');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	Sp_Abm_Bancos: Sp_Abm_Bancos,
	getModificar: getModificar,
	getEliminar: getEliminar,
	ValidarCodigo: ValidarCodigo
}

function getLista(req, res) {
	mBancos.getAll(function (bancos){
		res.render('bancos_lista', {
			pagename: 'Bancos',
			bancos: bancos
		});
	});
}

function getAlta(req, res){
	mBancos.getNextCodigo(function(banco){
			res.render("bancos_alta", {
			pagename: "Alta de Bancos",
			nextCodigo: banco[0].proximo_codigo 
		});
	});
}

function Sp_Abm_Bancos(req, res){
	var oBancos = req.body;
	oBancos.nombre = oBancos.nombre.toUpperCase();

	mBancos.Sp_Abm_Bancos(oBancos, function(){
		res.redirect('/bancos/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const codigo = params.codigo;

	mBancos.getByCodigo(codigo, function(bancos){
		res.render('bancos_modificar', {
			pagename: 'Modificar Informacion de Bancos',
			bancos: bancos[0]
		});
	});
}

function getEliminar(req, res){
	const params = req.params;
	const codigo = params.codigo;

	// verificar movimientos
	mBancos.validacionMovimientos(codigo, function(movimientos){
		if (movimientos.length > 0){
			res.render("error", {
				error: "No se puede eliminar este Banco porque tiene movimientos."
			});
		}else{
			mBancos.del(codigo, function(){
				res.redirect('/bancos/lista');
			});
		}
	});
	
}

function ValidarCodigo(req, res){
	const params = req.params;
	const codigo = params.codigo;

	mBancos.getByCodigo(codigo, function(bancos){
		res.send(bancos);
	});
}