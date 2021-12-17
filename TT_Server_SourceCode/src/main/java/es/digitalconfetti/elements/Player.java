package es.digitalconfetti.elements;

import org.springframework.web.socket.WebSocketSession;

public class Player {
	
	private WebSocketSession wss; 			// id WS session
	
	private Boolean connected;
	
	private String name;
	
	private String lobby;
	
	public Player(WebSocketSession wss){
		this.wss = wss;
		this.connected = false;
		this.name = null;
		this.lobby = null;
	}
	
	public Boolean equals(WebSocketSession ws) {
		return this.wss.getId().equals(ws.getId());
	}
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
		this.connected = true;
	}
	public String getLobby() {
		return lobby;
	}
	public void setLobby(String lobby) {
		this.lobby = lobby;
	}
	
	public Boolean isConnected() {
		return this.connected;
	}
	
	public void connect() {
		this.connected = true;
	}
}
