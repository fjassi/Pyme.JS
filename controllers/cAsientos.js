const mAsientos = require('../models/mAsientos');
const mPlanDeCuentas = require('../models/mPlanDeCuentas');

const tools = require('../public/js/utils.js');
const async = require('async');
const sql = require('mssql');
const config = require('../config/db').config;

module.exports = {
	getLista: getLista,
	getFiltroAjax: getFiltroAjax,
	getFiltroContenidoAjax: getFiltroContenidoAjax,
	getAlta: getAlta,
	postAlta: postAlta
}


function getLista(req, res){
	res.render("asientos_lista", {
		pagename: "Lista de Asientos Contables"
	});
}

function getFiltroAjax(req, res){
	const params = req.params;
	var desde = params.desde;
	var hasta = params.hasta;

	mAsientos.getFiltroAjax(desde, hasta, function(asientos){
		var objData = { "data" : asientos };
		res.send(objData);
	});
}

function getFiltroContenidoAjax(req, res){
	const params = req.params;
	var fecha = params.fecha;
	var asiento = params.asiento;

	mAsientos.getFiltroContenidoAjax(fecha, asiento, function(contenido){
		var objData = { "data" : contenido };
		res.send(objData);
	});
}

function getAlta(req, res){
	mPlanDeCuentas.getAllImputables(function (cuentas){
		console.log(cuentas.length)
		res.render("asientos_alta", {
			pagename: "Alta de Asiento",
			cuentas: cuentas
		});
	});
}

function postAlta(req, res){
	const params = req.body;
	var fecha = params.fecha;
	var nro_asiento = params.nro_asiento;
	var titulo = params.titulo;
	var aTipo = params.tipo;
	var aCuenta = params.cuenta;
	var aImporte = params.importe;
	var aDescripcion = params.descripcion;
	var aNombreCuenta = params.nombre_cuenta;

	var anio = fecha.substring(6, 10);
	var mes = fecha.substring(3, 5);
	if (parseInt(mes)<10){
		mes = mes.substring(1, 2);
	}
	if (mes.length = 1)
		mes = " "+mes;

	var asiento_length = nro_asiento.length;
	var resto = 4 - parseInt(nro_asiento.length);
	switch(resto){
		case 1:
			nro_asiento = " "+nro_asiento;
			break;
		case 2:
			nro_asiento = "  "+nro_asiento;
			break;
		case 3:
			nro_asiento = "   "+nro_asiento;
			break;
		default:
			break;		
	}

	var impod = [];
	var impoc = [];
	var debe = [];
	var cred = [];
	// ver si el importe va a debe o credito segun el tipo
	for(var x = 0; x < aTipo.length; x++){
    	if(aTipo[x] == 'D'){
    		debe.push(aCuenta[x]);
    		cred.push('');
    		impod.push(aImporte[x]);
    		impoc.push(0);
    	}else{
    		if (aTipo[x] == 'H'){
    			debe.push('');
        		cred.push(aCuenta[x]);
        		impod.push(0);
        		impoc.push(aImporte[x]);	
    		}else{
    			res.render("error", {
    				error: "Error. cAsientos:119 -"
    			});
    		}
    	}
	}

	var multi = anio+mes+nro_asiento;
	var movimientos = aImporte.length;
	var fecha_f = tools.changeDate(fecha);

	console.log("---------------------DEBUG")
	console.log(aTipo)
	console.log(debe)
	console.log(cred)
	console.log(impod)
	console.log(impoc)

	mAsientos.Sp_Abm_Asti(multi, titulo, fecha_f, movimientos, function(){
		var connection = new sql.Connection(config, function (err) {
	        if (err) throw err;
	        var request = new sql.Request(connection);

	        async.eachSeries(aTipo, function(element, callback){
	        	var index = aTipo.indexOf(element);        	
	        	console.log(index)
	        	query = "Sp_Abm_Diario '"+fecha_f+"', "+nro_asiento+", '"+debe[index]+"', '"+cred[index]+"', "+impod[index]+", "+impoc[index]+", '"+aDescripcion[index]+"', 'N'";
		        console.log(query)
		        request.query(query, function (err, recordset) {
		        	//recordset = resultados
		        	if (err){
		        		throw err;
		        	}else{
		        		callback();
		        	}
		        });
	        }, function(err){
	        	console.log("Finished.-")
	        	res.redirect("/asientos/lista")
	        });	        
	    });
	});
}