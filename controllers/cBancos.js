var mBancos = require('../models/mBancos');

module.exports = {
	getLista: getLista,
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
// falta getAlta

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

	mBancos.getByCodigo(codigo, function(banco){
		res.send(banco);
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
	const id = params.id;

	mBancos.del(id, function(){
		res.redirect('/bancos/lista');
	});
}
