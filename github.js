var github = require('octonode');
var colors = require('colors');

var myversion;
var client = github.client({
  username: 'GH Username',
  password: 'GH Password'
});

var mydata = {plugins:[
			{user:'twbs',repo:'bootstrap',name:'bootstrap',myversion:'v3.3.1'},
			{user:'guillaumepotier',repo:'Parsley.js',name:'Parsley.js',myversion:'2.0.5'},
			{user:'stidges',repo:'jquery-searchable',name:'jquery-searchable',myversion:'1.1.0'},
			{user:'drvic10k',repo:'bootstrap-sortable',name:'bootstrap-sortable',myversion:'1.9.0'}
         ]};

for (var i = 0; i < mydata.plugins.length; i++) {
 var plugin = mydata.plugins[i];
 ( function(plugin) {
    client.get("/repos/"+plugin.user+"/"+plugin.repo+"/tags", {}, function(err, status, body, headers){
        if(status === 200) {
            var ghresult = body[0]; 
			if(ghresult.name.toString() !== plugin.myversion.toString()){
				myversion = colors.red(plugin.myversion);
			} else {
				myversion = colors.gray(plugin.myversion);
			}
            console.log(colors.yellow(plugin.name)+" current version: "+ colors.green(ghresult.name) +" :: My Version: "+ myversion);
        } else {
            console.log(err);
        }
    });
 })( plugin );
}