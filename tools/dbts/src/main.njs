
var transfile = require('./transfile.njs');

var srcFilePath = "../resource/src.md";
var goalFilePath = "../resource/goal.md";

//var testString="To-be-main be";
//console.log(testString.indexOf("be"));
transfile.transfile(srcFilePath,goalFilePath);
//testString = testString.replace("-","");
//console.log(testString);
