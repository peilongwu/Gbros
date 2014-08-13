/**
 * New node file
 */
var workbook = require('./workbook.json');

exports.getTrans = function(field){
	var trans = exports.trans(field);
	if(trans.charAt(0) === '_'){
		return trans.substring(1,trans.length);
	}else{
		return trans;
	}
};

exports.trans = function(field){
	var tmpField = field;
	var flength = field.length;
	for(var i = 0; i < flength; i++){
		for(var j = flength; j > 0; j--){
			var subField = field.substring(i,j);
			if(exports.getValue(subField) !== false){
				tmpField = tmpField.replace(subField,"_" + exports.getValue(subField));
			}
		}
	}
	return tmpField;
};

exports.getValue = function(key){
	if(workbook[key]){
		return workbook[key];
	}
	return false;
};
