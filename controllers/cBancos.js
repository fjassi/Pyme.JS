var mBancos = require('../models/mBancos');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getEliminar: getEliminar
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
	res.render("bancos_alta", {
		pagename: "Alta de Bancos"
	});
}

function postAlta(req, res){
	const params = req.body;
	const codigo = params.codigo
	const nombre = params.nombre;
	const cuit = params.cuit;

	mBancos.Sp_Abm_Bancos(codigo, nombre, cuit, function(){
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

function postModificar(req, res){
	const params = req.body;
	const codigo = params.codigo;
	const nombre = params.nombre;
	const cuit = params.cuit;
	
	mBancos.Sp_Abm_Bancos(codigo, nombre, cuit, function(){
		res.redirect('/bancos/lista');
	});
}	

function getEliminar(req, res){
	const params = req.params;
	const codigo = params.codigo;

	mBancos.del(codigo, function(){
		res.redirect('/bancos/lista');
	});
}
