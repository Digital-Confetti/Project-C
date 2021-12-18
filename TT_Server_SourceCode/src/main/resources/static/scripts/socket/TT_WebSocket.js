export class TT_WebSocket {

    init_TTsocket(){
		this.connection = new WebSocket('ws://192.168.1.38:8080/TT');

		this.lobby = undefined;

		this.connection.onmessage = function(msg) {
			if (this.lobby === undefined) {
				this.lobby = msg.data;
			} else {
				console.log("WS message: " + msg.data);
			}
			
		}

		this.connection.onclose = function() { console.log("Closing socket"); }
		this.connection.onerror = function(e){ console.log("WS error: " + e); }
    }

	setServerSupport(serverSupport){
		this.serverSupport = serverSupport;
	}
	
	sendMessage(msg)
	{
		/*
		var msg2 = {
			type : tipo,
			body: msg
		}
		*/
		this.connection.send(msg);
	}

}
