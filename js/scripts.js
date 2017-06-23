
document.addEventListener('NexpaqAPIReady', function(event) {
		Nexpaq.API.Module.addEventListener('DataReceived', function(event) {
			// we don't care about data not related to our module
			if(event.module_uuid != Nexpaq.Arguments[0]) return;

			if(event.data_source == 'StatusRequestResponse') {
				if(event.variables.status == 'connected') {
					console.log("connected");
					document.getElementById('connect-panel').style.backgroundImage = 'url(img/connect_active.svg)';
					document.getElementById('connect').classList.add("hidden");
					document.getElementById('disconnect').classList.remove("hidden");
				} else if(event.variables.status == 'disconnected') {
					console.log("disconnected");
					document.getElementById('connect-panel').style.backgroundImage = 'url(img/connect.svg)';
					document.getElementById('disconnect').classList.add("hidden");
					document.getElementById('connect').classList.remove("hidden");
				}
			} else if(event.data_source == 'StateChangeResponse') {
				if(event.variables.result == 'success') {
					Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'StatusCheck', []);
				}
			}
  	});
		
		Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'StatusCheck', []);

		var interval = setInterval(function() {
    	Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'StatusCheck', []);
		}, 15000);
});

/* =========== ON PAGE LOAD HANDLER */
document.addEventListener("DOMContentLoaded", function(event) {
	Nexpaq.Header.create('SD Card');
	Nexpaq.Header.customize({backgroundColor:"#D43755",color:"#FFFFFF",iconColor:"#FFFFFF", borderBottom: "none"});
	Nexpaq.Header.hideShadow();

	document.getElementById('connect').addEventListener('click', function() {
		console.log("connecting");
    Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'Connect', [1]);	
	});

	document.getElementById('disconnect').addEventListener('click', function() {
		console.log("disconnecting");
    Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'Disconnect', [1]);	
	});

	document.getElementById('open').addEventListener('click', function() {
		// File Manager
	});

});
