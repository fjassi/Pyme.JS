const mProveedores = require('../models/mProveedores');
// const mPlanDeCuentas = require('../models/mPlanDeCuentas');
// var nodeExcel = require('excel-export');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	sp_proveedores: sp_proveedores,
	getModificar: getModificar,
	getEliminar: getEliminar,
	ValidarCodigo: ValidarCodigo
}

function getLista(req, res) {
  	mProveedores.getAll(function (codigosegreso){
  		res.render("proveedores_lista", {
			pagename: 'Lista de Proveedores',
			codigosegreso: Proveedorsegreso
		});
  	});
}

function getAlta(req, res){
	mPlanDeCuentas.getAllImputables(function(imputables){
		mProveedores.getNextCodigo(function(nextcodigo){
			res.render("proveedores_alta", {
				pagename: "Alta de Proveedor",
				imputables: imputables,
				nextcodigo: nextcodigo[0].proximo_codigo
			});
		});
	});
}

function sp_proveedores(req, res){
	const oCoeg = req.body;
	console.log(oCoeg);
	oCoeg.nombre = oCoeg.nombre.toUpperCase();

	mProveedores.sp_proveedores(oCoeg, function(){
		res.redirect('/proveedores/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const codigo = params.codigo;

	mProveedores.getByCodigo(codigo, function(codigoegreso){
		console.log(codigoegreso)
		mPlanDeCuentas.getAllImputables(function(imputables){
			res.render("proveedores_modificar", {
				pagename: "Modificar Proveedor",
				imputables: imputables,
				codigoegreso: Proveedoregreso[0]
			});
		});
	});
}

function getEliminar(req, res){
	const params = req.params;
	const codigo = params.codigo;
	// 	Coeg.co_codigo
	// Verificar en 2 tablas
	// Pcas.ps_coeg
	// Corri.ct_coeg
	mProveedores.validacionMovimientos(codigo, function(movimientos){
		if (movimientos.length == 0){
			mProveedores.del(codigo, function(){
				res.redirect('/proveedores/lista');
			});
		}else{
			res.render("error", {
				error: "Este Proveedor no se puede eliminar porque posee movimientos!"
			});
		}
	});
}

function ValidarCodigo(req, res){
	const params = req.params;
	const codigo = params.codigo;

	mProveedores.getByCodigo(codigo, function(codigo){
		res.send(codigo);
	});
}