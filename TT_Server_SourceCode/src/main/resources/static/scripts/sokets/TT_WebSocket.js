export class TT_WebSocket {

    constructor(path, f) {
        console.log("SOCKET CONSTRUCTOR")
        //this.s = new WebSocket(path);
        this.f = f;
        this.f.hola();
    }

    send(massage){
        var pkg = {
            type : "pollaa",
            name : $('#name').val(),
            message : $('#message').val()	
    	}

	    this.s.send(JSON.stringify(message));
    }

}