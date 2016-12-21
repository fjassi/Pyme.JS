const mPeriodos = require('../models/mPeriodos');
const tools = require('../public/js/utils.js');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	getModificar: getModificar,
	getVer: getVer,
	Sp_Abm_Peri: Sp_Abm_Peri,
	getEliminar: getEliminar
}

function getLista(req, res) {
	mPeriodos.getAll(function (periodos){
		res.render("periodoscontables_lista", {
			pagename: "Periodos Contables",
			periodos: periodos
		});
	});	
}

function getAlta(req, res){
	res.render("periodoscontables_alta", {
		pagename: "Nuevo Periodo"
	});
}


function getModificar(req, res){
	const params = req.params;
	var fecha_desde = params.fecha_desde;
			fecha_desde = tools.changeDate(fecha_desde);

	mPeriodos.getByFecha(fecha_desde, function(periodo){
		res.render("periodoscontables_modificar", {
			pagename: "Modificar Periodo",
			periodo: periodo[0]
		});
	});
}

function getVer(req, res){
	const params = req.params;
	var fecha_desde = params.fecha_desde;
			fecha_desde = tools.changeDate(fecha_desde);

	mPeriodos.getByFecha(fecha_desde, function (periodo){
		res.render("periodoscontables_ver", {
			pagename: "Ver Periodo desde "+periodo[0].desde+" hasta "+periodo[0].hasta,
			periodo: periodo[0]
		});
	});
}

function Sp_Abm_Peri(req, res){
	var oPeriodos = req.body;
	oPeriodos.desde = tools.changeDate(oPeriodos.desde);
	oPeriodos.hasta = tools.changeDate(oPeriodos.hasta);
	
	mPeriodos.Sp_Abm_Peri(oPeriodos, function(){
		res.redirect('/periodoscontables/lista');
	});
}

function getEliminar(req, res){
	const params = req.params;
	var fecha_desde = params.fecha_desde;
			fecha_desde = tools.changeDate(fecha_desde);

	console.log(fecha_desde);

	mPeriodos.validacionMovimientos(fecha_desde, function(movimientos){
		if (movimientos.length == 0){
			mPeriodos.del(fecha_desde, function(){
				res.redirect('/periodoscontables/lista');
			});
		}else{
			res.render("error", {
				error: "Este Periodo no se puede eliminar porque posee movimientos!"
			});
		}
	});
}