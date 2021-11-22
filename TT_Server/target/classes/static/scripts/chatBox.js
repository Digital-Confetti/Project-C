var aux = window.location + "get/";

function sendPlayer(playerName){
    console.log(playerName);
    $.ajax({
        method: "POST",
        url: aux,
        data: playerName,
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {

        console.log(data.name);
        console.log(data.lobby);

        let msgAction = $("#messageAction");
        msgAction.empty();
        msgAction.append('<input name"usermsg" type="text" id="usermsg" size="63"/>');
        msgAction.append('<input name"submitmsg" type="button" id="submitmsg" value="Send"/>');

        let userData = $("#userdata");
        // Vaciamos el user data y ponemos un display del nombre
        userData.empty();
        userData.append('<p><b>'+ playerName +'</b></p>');
    })

}

// GET -> MENSAJES
function getMessages(callback){
    $.ajax({
        url: aux
    }).done(function (messages) {
        console.log("Mensajes cargados" + JSON.stringify(messages));
        callback(messages);
    })

}

function updateMesages(messages){

}

//  POST -> MENSAJES
function sendMassage( msg, callback) {
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

    var userData = $("#userdata");
    var setName = $("#setName");
    var nick = $("#nick");

    var msgAction = $('#messageAction');
    var submit = $('#submitmsg');
    var msg = $('#usermsg');
    var chatBox = $('#chatbox');
    
    var player;
	
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
        nick.val("");

        sendPlayer(aux);
    });
	
});

