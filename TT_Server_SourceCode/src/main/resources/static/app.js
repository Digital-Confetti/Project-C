$(document).ready(function(){
	var connection = new WebSocket('ws://127.0.0.1:8080/echo');
	connection.onerror = function(e) {
	  console.log("WS error: " + e);
	}
	connection.onmessage = function(msg) {
	  console.log("WS message: " + msg.data);
	}
    $('#send-btn').click(function() {
    	var message = $('#message').val()	
	    connection.send(message);
    });
})