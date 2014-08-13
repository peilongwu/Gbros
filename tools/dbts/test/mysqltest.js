/**
 * New node file
 */

//var mysql = require('../src/db/mysql.njs');
//
//mysql.open();
//mysql.query("select * from gbe_app",function(err,rows,fields){
//	console.log(rows);
//});
//mysql.close();

var wordbook = require('../src/db/wordbook.njs');
wordbook.getAll();


