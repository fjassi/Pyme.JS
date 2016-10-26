const cIndex = require('./controllers/cIndex');
const cBancos = require('./controllers/cBancos');

module.exports = function(app) {
	app.get('/', cIndex.getInicio);
	app.get('/error', cIndex.getError);
	app.get('/bancos/lista', cBancos.getLista);
	app.post('/bancos/nuevo', cBancos.postAlta);
	app.get('/bancos/modificar/:codigo', cBancos.getModificar);
	app.post('/bancos/modificar', cBancos.postModificar);
	app.get('/bancos/eliminar/:codigo', cBancos.getEliminar);
}