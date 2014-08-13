
var srcFile = require('fs');
var goalFile = require('fs');
var trans = require("./trans.njs");

var readable;
var writable;

exports.readyRead = function(src){
	srcFile.exists(src, function (exists){
		if(!exists){
			throw new Error("src file is not exist");
		}
	});
	readable = srcFile.createReadStream(src, {
		flags : 'r',
		encoding : 'utf-8',
		fd : null,
		mode : 0666,
		autoClose : true
	});
	
};

exports.readyWrite = function(goal){
	goalFile.exists(goal, function (exists){
		if(!exists){
			goalFile.writeFile(goal);
			console.log("goal file is not exist");
		}
		writable = goalFile.createWriteStream(goal, {
			flags : 'r+',
			encoding : 'utf-8',
			fd : null,
			mode : 0666,
			autoClose : false
		});
	});
};

exports.transfile = function(srcFilePath,goalFilePath){
	try{
		exports.readyRead(srcFilePath);
		exports.readyWrite(goalFilePath);
		readable.on('readable', function(chunk) {
			writable.open();
			writable.write("\n\r");
			while (null !== (chunk = readable.read())) {
				var array = chunk.split("\n\r");
				for(var i=0; i<array.length; i++){
					exports.writeGoalFile(array[i]);
				}
			}
			writable.close();
		});
	}catch(e){
		console.log(e.message);
	}
};

exports.writeGoalFile = function(field){
	if(field.trim() !== ""){
		var transField = "";
		var location = field.indexOf(",") < 0 ? field.length : field.indexOf(",");
		if(field.indexOf("- ") === 0){
			transField = field.substring(0,location) + "(" + trans.getTrans(field.substring(2,location)) + ")" ;
			writable.write(transField + field.substring(location,field.length));
			//writable.write(transField + "\n");
		}else if(field.indexOf("\t- ") === 0){
			transField = field.substring(0,location) + "(" + trans.getTrans(field.substring(3,location)) + ")" ;
			writable.write(transField + field.substring(location,field.length));
			//writable.write(transField + "\n");
		}else{
			writable.write(field);
		}

	}
};


