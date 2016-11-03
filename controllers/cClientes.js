const mClientes = require('../models/mClientes');
const  mCdiva = require('../models/mCdiva');
const mTidofis = require('../models/mTidofis');
const mProvincias = require('../models/mProvincias');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	sp_clientes: sp_clientes,
	getModificar: getModificar,
	getEliminar: getEliminar,
	ValidarNumero: ValidarNumero
}

function getLista(req, res) {
	mClientes.getAll(function (clientes){
		res.render('clientes_lista', {
			pagename: 'Lista de Clientes',
			clientes: clientes
		});
	});
}

function getAlta(req, res){
	mClientes.getNextNumero(function(prox){
		mCdiva.getAll(function(codigos_iva){
			mTidofis.getAll(function(tipo_docs){
				mProvincias.getAll(function(provincias){
					res.render("clientes_alta", {
						pagename: "Alta de Cliente",
						nextcodigo: prox[0].proximo_codigo,
						codigos_iva: codigos_iva,
						tipo_docs: tipo_docs,
						provincias: provincias
					});
				});
			});			
		});
	});
}

function sp_clientes(req, res){
	var oCliente = req.body;
	console.log(oCliente)

	
	mClientes.sp_clientes(oCliente, function(){
		res.redirect('/clientes/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mClientes.getById(id, function(cliente){
		res.render("clientes_modificar", {
			pagename: "Modificar Cliente",
			cliente: cliente[0]
		});
	});	
}

function getEliminar(req, res){
	const params = req.params;
	const id = params.id;

	// verificar movimientos
	mClientes.del(id, function(){
		res.redirect('/clientes/lista');
	});
}

function ValidarNumero(req, res){
	const params = req.params;
	const numero = params.numero;

	mClientes.getByNumero(numero, function(cliente){
		res.send(cliente);
	});
}