
var fs = require('fs');
// fs.renameSync('D:\\临时文件\\测试nodejs.txt', 'D:\\临时文件\\nodejs.txt');
var readable = fs.createReadStream('D:\\临时文件\\nodejs.txt', {
	flags : 'r',
	encoding : 'utf-8',
	fd : null,
	mode : 0666,
	autoClose : true
});
readable.on('readable', function(chunk) {
	while (null !== (chunk = readable.read())) {
		//console.log('got %d bytes of data', chunk.length);
		//console.log(chunk.toString());
		
		var array = chunk.split("\n");
		for(var i = 0; i < array.length; i++){
			console.log("------------");
			console.log(array[i]);
		}
		
	}
});