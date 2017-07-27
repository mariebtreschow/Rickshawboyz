
var MongoClient = require('mongodb').MongoClient,
	test = require('assert');
var url = 'mongodb://localhost:8050/';
MongoClient.connect(url, function(err, db) {
	var adminDb = db.admin();
	adminDb.listDatabases(function(err, dbs) {
		for(i=0;i<dbs.databases.length;i++){
			console.log(dbs.databases[i].name);
		}
		db.close();
	});
});