export class TT_WebSocket {

    init_TTsocket(){
		this.connection = new WebSocket('ws://192.168.1.38:8080/TT');
		
		this.identification = undefined;

		this.connection.onmessage = function(msg) {
			if (this.identification === undefined) {
				this.identification = msg.data;
			} else {
				console.log("WS message: " + msg.data);
			}
			
		}

		this.connection.onclose = function() { console.log("Closing socket"); }
		this.connection.onerror = function(e){ console.log("WS error: " + e); }
    }
	
	sendMessage(msg)
	{
		var msg2 = {
			type : tipo,
			body: msg
		}
		this.connection.send(msg2);
	}

}
