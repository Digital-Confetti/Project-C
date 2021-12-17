export class TT_WebSocket {

    init_TTsocket(){
		var hola = "Hola!"
		
		this.connection = new WebSocket('ws://192.168.1.38:8080/TT');
		
		this.connection.onerror = function(e) {
			console.log("WS error: " + e);
		}
		this.connection.onmessage = function(msg) {
			console.log("WS message: " + msg.data);
			$('#chat').append(msg.data)
		}
		this.connection.onclose = function() {
			console.log("Closing socket");
		}
		
        console.log(hola);
    }
	
	sendMessage(msg)
	{
		this.connection.send(msg);
	}

}
