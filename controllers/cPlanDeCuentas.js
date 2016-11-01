var mPlanDeCuentas = require('../models/mPlanDeCuentas');
var mLuke = require('../models/mLuke');

var nodeExcel = require('excel-export');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getEliminar: getEliminar,
	getAjax_CantDigitosPorNivel: getAjax_CantDigitosPorNivel,
	getExport: getExport
}

function getLista(req, res) {
  	mPlanDeCuentas.getAll(function (plandecuentas){
  		res.render("plandecuentas_lista", {
			pagename: 'Lista de Plan de Cuentas',
			plandecuentas: plandecuentas
		});
  	});
}

function getAlta(req, res){
	res.render("plandecuentas_alta", {
		pagename: "Alta de Plan de Cuenta"
	});
}

function postAlta(req, res){
	const params = req.body;
	// console.log(params);
	const codigo = params.codigo;
	var nombre = params.nombre;
	nombre = nombre.toUpperCase();
	var imputable = params.imputable;
	var ajustable = params.ajustable;
	const nivel = params.nivel;

	if (imputable == 'on')
		imputable = 'S';
	else
		imputable = 'N';

	if (ajustable == 'on')
		ajustable = 'S';
	else
		ajustable = 'N';

	mPlanDeCuentas.Sp_Alta_Cuen(codigo, nombre, imputable, ajustable, nivel, function(){
		res.redirect('/plandecuentas/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const cuenta = params.cuenta;
	mPlanDeCuentas.getByCuenta(cuenta, function(plandecuenta){
		console.log(plandecuenta)
		res.render("plandecuentas_modificar", {
			pagename: "Modificar Plan de Cuenta",
			plandecuenta: plandecuenta[0]
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	console.log(params);
	const codigo = params.codigo;
	const nombre = params.nombre;
	var imputable = params.imputable;
	var ajustable = params.ajustable;
	const nivel = params.nivel;

	if (imputable == 'on')
		imputable = 'S';
	else
		imputable = 'N';

	if (ajustable == 'on')
		ajustable = 'S';
	else
		ajustable = 'N';

	mPlanDeCuentas.Sp_Alta_Cuen(codigo, nombre, imputable, ajustable, nivel, function(){
		res.redirect('/plandecuentas/lista');
	});
}

function getEliminar(req, res){
	const params = req.params;
	const cuenta = params.cuenta;

	// si la cuenta que se intenta eliminar tiene registros en ld_debe o ld_cred no se puede eliminar
	//selec top1(l) from diario where ld_debe = cuenta or ld_cred = cuenta
	mPlanDeCuentas.validacionMovimientos(cuenta, function(validacion){
		if(validacion.length > 0){
			res.render("error", {
				error: "Esta cuenta no se puede eliminar porque posee movimientos en la tabla 'Diario'"
			});
		}else{
			mPlanDeCuentas.del(cuenta, function(){
				res.redirect("/plandecuentas/lista");
			});
		}
	});
}

function getAjax_CantDigitosPorNivel(req, res){
	mLuke.getCantDigitosPorNivel(function(cantdigitos){
		res.send(cantdigitos);
	});
}

function getExport(req, res){
	console.log("go!")
	//var cellData = "Give me something to believe";

	mPlanDeCuentas.getAll(function (plandecuentas){
		var conf = {};

		//este tiene una url acá pero en el server es otra....
		conf.stylesXmlFile = "D:/Proyectos/Pyme.JS/style.xml";
			// conf.stylesXmlFile = "C:/Users/Administrador/Documents/Proyectos/Maresa/style.xml";

	    conf.cols = [{caption:'Codigo', type:'string'},
	    {caption:'Denominacion', type:'string'},
	    {caption:'Imputable', type:'string'},
	    {caption:'Ajustable', type:'string'},
	    {caption:'Nivel', type:'string'}];
	
		var arrPlan = [];

		for (var x = 0 ; x < plandecuentas.length ; x++){
	    	var cuenta = plandecuentas[x].cuenta;
	    	var nombre = plandecuentas[x].nombre;
	    	var impu = plandecuentas[x].impu;
	    	if (impu == 'S')
	    		impu = 'Si';
	    	else
	    		impu = 'No';
	    	var ajus = plandecuentas[x].ajus;
	    	if (ajus == 'S')
	    		ajus = 'Si';
	    	else
	    		ajus = 'No';
	    	var nivel = plandecuentas[x].nivel;

	    	var plan = [];

	    	plan.push(cuenta);
	    	plan.push(nombre);
	    	plan.push(impu);
	    	plan.push(ajus);
	    	plan.push(nivel);

	    	arrPlan.push(plan);
	    }

	   	conf.rows = arrPlan;
	    var result = nodeExcel.execute(conf);
	    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
	    res.setHeader("Content-Disposition", "attachment; filename=" + "PlanDeCuentas.xlsx");
	    res.end(result, 'binary');
	});    
    console.log("finished")
}