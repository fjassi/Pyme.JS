const mProveedores = require('../models/mProveedores');
const mProvincias = require('../models/mProvincias');
const mCdiva = require('../models/mCdiva');
// const mPlanDeCuentas = require('../models/mPlanDeCuentas');
// var nodeExcel = require('excel-export');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	sp_proveedores: sp_proveedores,
	getModificar: getModificar,
	getEliminar: getEliminar
}

function getLista(req, res) {
  	mProveedores.getAll(function (proveedores){
  		res.render("proveedores_lista", {
			pagename: 'Lista de Proveedores',
			proveedores: proveedores
		});
  });
}

function getAlta(req, res){
	mProveedores.getNextCodigo(function(nextcodigo){
		mProvincias.getAll(function(provincias){
			mCdiva.getAll(function(codigos_iva){
					res.render("proveedores_alta", {
					pagename: "Alta de Proveedor",
					nextcodigo: nextcodigo[0].proximo_codigo,
					provincias: provincias,
					codigos_iva: codigos_iva
				});
			});
		});
	});	
}

function sp_proveedores(req, res){
	var oProveedores = req.body;
	oProveedores.razonsocial = oProveedores.razonsocial.toUpperCase();
	oProveedores.fantasia = oProveedores.fantasia.toUpperCase();
	oProveedores.direccion = oProveedores.direccion.toUpperCase();
	oProveedores.localidad = oProveedores.localidad.toUpperCase();
	oProveedores.conombre = oProveedores.conombre.toUpperCase();

	if (oProveedores.retgan == 'on')
		oProveedores.retgan = 1;
	else
		oProveedores.retgan = 0;

	if (oProveedores.retib == 'on')
		oProveedores.retib = 1;
	else
		oProveedores.retib = 0;

	if (oProveedores.ig == 'on')
		oProveedores.ig = 1;
	else
		oProveedores.ig = 0;

	mProveedores.sp_proveedores(oProveedores, function(){
		res.redirect('/proveedores/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const numero = params.numero;

	mProveedores.getByCodigo(numero, function(proveedores){
		mProvincias.getAll(function(provincias){
			mCdiva.getAll(function(codigos_iva){
					res.render("proveedores_modificar", {
					pagename: "Modificar Proveedor",
					proveedores: proveedores[0],
					provincias: provincias,
					codigos_iva: codigos_iva
				});
			});
		});
	});
}

function getEliminar(req, res){
	const params = req.params;
	const numero = params.numero;

	mProveedores.validacionMovimientos(numero, function(movimientos){
		if (movimientos.length == 0){
			mProveedores.del(numero, function(){
				res.redirect('/proveedores/lista');
			});
		}else{
			res.render("error", {
				error: "Este Proveedor no se puede eliminar porque posee movimientos!"
			});
		}
	});
}