var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll
}

function getAll(cb){
	conn("select * from cdiva order by codigo", cb);
}