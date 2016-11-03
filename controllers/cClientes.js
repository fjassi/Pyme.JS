const mClientes = require('../models/mClientes');
const  mCdiva = require('../models/mCdiva');
const mTidofis = require('../models/mTidofis');
const mProvincias = require('../models/mProvincias');

var tools = require('../public/js/utils.js');

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

	if (oCliente.posee == 'on')
		oCliente.posee = 'S';
	else
		oCliente.posee = 'N';

	if (oCliente.habilitada == 'on')
		oCliente.habilitada = 'S';
	else
		oCliente.habilitada = 'N';

	if (oCliente.saldopositivo == 'on')
		oCliente.saldopositivo = 'S';
	else
		oCliente.saldopositivo = 'N';

	if (oCliente.baja == 'on')
		oCliente.baja = 'S';
	else
		oCliente.baja = 'N';

	if(oCliente.fecha_alta.length > 0)
		oCliente.fecha_alta = tools.changeDate(oCliente.fecha_alta);
	
	mClientes.sp_clientes(oCliente, function(){
		res.redirect('/clientes/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const numero = params.numero;

	mCdiva.getAll(function(codigos_iva){
		mTidofis.getAll(function(tipo_docs){
			mProvincias.getAll(function(provincias){
				mClientes.getByNumero(numero, function(cliente){
					res.render("clientes_modificar", {
						pagename: "Modificar Cliente",
						cliente: cliente[0],
						codigos_iva: codigos_iva,
						tipo_docs: tipo_docs,
						provincias: provincias
					});
				});
			});
		});
	});		
}

function getEliminar(req, res){
	const params = req.params;
	const numero = params.numero;

	// verificar movimientos
	mClientes.del(numero, function(){
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