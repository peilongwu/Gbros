/**
 * function:
 *  1.get wordbook from the table gbe_wordbook in mysql
 *  2.generate wordbook.json file from step 1
 */

var mysql = require("./mysql.njs");
var wordbookFile = require('fs');

var writable;

exports.readyWrite = function(wordbook){
	wordbookFile.exists(wordbook, function (exists){
		if(!exists){
			wordbookFile.writeFile(wordbook);
			console.log("wordbook file is not exist");
		}
		writable = wordbookFile.createWriteStream(wordbook, {
			flags : 'w',
			encoding : 'utf-8',
			fd : null,
			mode : 0666,
			autoClose : false
		});
	});
};

module.exports.getAll = function (){
	mysql.open();
	exports.readyWrite("./wordbook.json");
	mysql.query("select * from gbe_wordbook ORDER BY LENGTH(name) DESC",function(err,rows,fields){
		writable.open();
		writable.write("\n");
		writable.write("{\n\t\"" + rows[0].name + "\":\"" + rows[0].trans_name + "\"");
		for(var i = 1; i < rows.length; i++){
			writable.write(",\n\t\"" + rows[i].name + "\":\"" + rows[i].trans_name + "\"");
		}
		writable.write("\n}");
		writable.close();
	});
	mysql.close();
};
