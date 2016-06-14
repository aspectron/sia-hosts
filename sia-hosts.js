var Sia = require("sia-api");
var _ = require("underscore");
var $ = require("./lib/utils");

var sia = new Sia({
	host : "http://localhost:9980"
})

sia.renter.hosts.active(function(err, resp) {
	if(err)
		return console.log(err);

	console.log("");

	var T = {
		total : 0,
		free : 0,
		hosts : 0,
		price : 0
	}

	_.each(_.sortBy(resp.hosts, 'netaddress'), function(h) {
		if(!h.acceptingcontracts)
			return;

		var totalstorage = parseFloat(h.totalstorage);
		var remainingstorage = parseFloat(h.remainingstorage);
		var storageprice = parseFloat(h.storageprice) * 1e12 * 4320;

		T.hosts++;
		T.total += totalstorage;
		T.free += remainingstorage;
		T.price += storageprice;

		console.log(
			$.PAD(h.netaddress,40), 
			$.PAD(totalstorage.toFileSize(true),14), 
			$.PAD(remainingstorage.toFileSize(true),14), 
			$.PAD(storageprice.toSia(2, 'SC', true),14)+'/TB/MO'
		);
	})

	T.price /= T.hosts;

	console.log("");
	console.log("Average Price:", T.price.toSia()+'/TB/MO');
	console.log("Total Storage:", T.total.toFileSize(true));
	console.log(" Free Storage:", T.free.toFileSize(true));
})

