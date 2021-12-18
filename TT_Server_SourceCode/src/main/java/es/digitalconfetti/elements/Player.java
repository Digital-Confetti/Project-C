package es.digitalconfetti.elements;

import java.io.IOException;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class Player {
	
	private WebSocketSession wss; 			// id WS session
	
	private String name;
	
	public Player(WebSocketSession wss, String name){
		this.wss = wss;
		this.name = name;
	}
	
	public Boolean equals(WebSocketSession ws) {
		return this.wss.getId().equals(ws.getId());
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void send(TextMessage textMessage) throws IOException{
		this.wss.sendMessage(textMessage);
	}
}
