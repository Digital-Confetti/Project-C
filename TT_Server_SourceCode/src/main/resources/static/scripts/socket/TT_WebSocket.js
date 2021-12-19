export class TT_WebSocket {

	setServerSupport(serverSupport){
		this.serverSupport = serverSupport;
	}

	proMessage(msg){
		var data = JSON.parse(msg.data);
		
		if(data.type == "chat"){
			
			console.log("Mensaje tipo chat: " + data.body);
		} else if (data.type == "menu"){
			// this.menuSeleccion.processMsg();
		}


	}
	
	sendMessage(msg, type)
	{
		
		var pkg = {
			type : type,
			body: msg
		}
		
		this.connection.send(JSON.stringify(pkg));
	}

	init_TTsocket(){
		this.connection = new WebSocket('ws://192.168.1.38:8080/TT');

		this.lobby = undefined;

		var that = this;

		this.connection.onmessage = function(msg) {
			that.proMessage(msg);
		}

		this.connection.onclose = function() { console.log("Closing socket"); }
		this.connection.onerror = function(e){ console.log("WS error: " + e); }
    }

}
