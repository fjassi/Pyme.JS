const cIndex = require('./controllers/cIndex');
const cBancos = require('./controllers/cBancos');

module.exports = function(app) {
	app.get('/', cIndex.getInicio);
	app.get('/bancos/lista', cBancos.getLista);
}