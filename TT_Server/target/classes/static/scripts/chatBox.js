var ip = "localhost:8080";
var aux = "http://" + ip;

// GET -> MENSAJES
function getMessages(callback){
    $.ajax({
        url: aux
    }).done(function (messages) {
        console.log("Mensajes cargados" + JSON.stringify(items));
        callback(messages);
    })

}

//  POST -> MENSAJES
function sendMMassage( msg, callback) {
    $.ajax({
        method: "POST",
        url: aux,
        data: JSON.stringify(msg),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (msg) {
        console.log("Mensaje creado: " + JSON.stringify(msg));
        callback(item);
    })
}

$(document).ready(function () {
    // Cargamos los mensajes
        //TODO 

    //Segmento de chat
    var msgAction = $('#messageAction');
	var submit = $('#submitmsg');
	var msg = $('#usermsg');
	var chatBox = $('#chatbox');

    //
    var player;

    var userData = $("#userdata");
    var setName = $("#setName");
    var nick = $("#nick");
	
	submit.click( function () {
		let plainText = msg.val();

        if(plainText != ''){
            console.log(plainText);
        }
		//Borramos el field text
		msg.val('');
	});

    //Boton asociado al addPlayer()
    setName.click( function () {
        let aux = nick.val();
        player = aux;
        // Llenamos el Msg action
        msgAction.empty();
        msgAction.append('<input name"usermsg" type="text" id="usermsg" size="63"/>');
        msgAction.append('<input name"submitmsg" type="button" id="submitmsg" value="Send"/>');

        // Vaciamos el user data y ponemos un display del nombre
        userData.empty();
        userData.append('<p><b>'+ player +'</b></p>');
    });
	
});

