export class TT_WebSocket {

	setServerSupport(serverSupport){
		this.serverSupport = serverSupport;
	}

	setMenu(menu){
		this.menu = menu;
	}
	setGame(game){
		this.game = game;
	}

	setInMenu(menu){
		this.inMenu = menu;
	}

	//TODO: 
	proMenuMessage(msg){
		// this.menu.processMsg(msg)
	}

	proChatMessage(msg){
		let chat = $("#chatbox");
		let out;
			
		out = '<p>' + msg.date;
        out += '- <label style="color:'+ msg.color + '"><b>' + msg.user + "</b>: " + msg.text;
        out += "</label></p>"

		chat.append(out);
	}

	proMessage(msg){
		var data = JSON.parse(msg.data);
		
		if(data.type == "chat"){
			console.log("Mensaje tipo chat: " + data.body);
			this.proChatMessage(data.body);
		} else if (data.type == "menu" && this.inMenu){
			this.menu.processMsg(data.body);
		} else if (data.type == "side")
		{
			// "red" ó "blue"
			this.menu.setSide(data.body);
		}else if(data.type == "start"){
			this.menu.startGame();
		} else if(data.type == "game"){
			this.game.processMsg(data.body);
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
		this.connection = new WebSocket('ws://localhost:8080/TT');

		this.inMenu = false;

		this.lobby = undefined;

		var that = this;

		this.connection.onmessage = function(msg) {
			that.proMessage(msg);
		}

		this.connection.onclose = function() { console.log("Closing socket"); }
		this.connection.onerror = function(e){ console.log("WS error: " + e); }
    }

}