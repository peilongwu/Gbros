/**
 * New node file
 */
var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost', //本地数据库
	user     : 'root',     //数据库用户名
	password : 'test',      //数据库密码
	database : 'gbros'  //数据库名称
});

module.exports.open = function(){
	connection.connect();
};

module.exports.close = function(){
	connection.end();
};

module.exports.query = function(sql,callback){
	connection.query(sql, function(err, rows, fields) {
		if (err){
			throw err;
		}else{
			callback(err,rows,fields);
		}
	});
};


