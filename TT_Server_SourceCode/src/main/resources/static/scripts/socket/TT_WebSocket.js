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
		} else if(data.type == "imp"){
			this.game.processImperative(data.body);
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
		this.connection = new WebSocket('ws://83.36.186.86:8080/TT');

		this.inMenu = false;

		this.lobby = undefined;

		var that = this;

		this.connection.onmessage = function(msg) {
			that.proMessage(msg);
		}

		this.connection.onclose = function() { 
			console.log("Closing socket"); 

			let chat = $("#chatbox");
			chat.empty();
			chat.append('<h1 style= color: red> Servidor desconectado </h1>');
			chat.append('<p>Prueba más adelante</p>');

			$("#messageAction").empty();			

			let usrData = $("#userdata");
			usrData.empty();
			usrData.append('<input type="text" id="nick"/><input type="button" id="setName" value="set Nickname"/> <label for="setColor">Choose color: </label><select id="setColor"><option value="magenta">Magenta</option><option value="red">Red</option><option value="orange">Orange</option><option value="yellow">Yellow</option><option value="green">Green</option><option value="cyan">Cyan</option><option value="blue">Blue</option><option value="violet">Violet</option></select>')
			
			$('#submitmsg').click( function () {
				let plainText = $("#usermsg").val();
				var now = new Date();
				now = "> " + now.toLocaleString();
				var pickedColor = color;
		
				var msg = {
					date: now,
					text: plainText,
					user: player,
					color: pickedColor,
				}
		
				if(plainText != ''){
					TT_WebSocket.prototype.sendMessage(msg, "chat");
					TT_WebSocket.prototype.proChatMessage(msg);
				}
		
				//Borramos el field text
				$("#usermsg").val('');
			});
		
		}
		this.connection.onerror = function(e){ console.log("WS error: " + e); }
    }

}