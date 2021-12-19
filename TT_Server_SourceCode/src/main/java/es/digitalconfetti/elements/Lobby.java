package es.digitalconfetti.elements;

import java.io.IOException;
import java.util.Random;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class Lobby {
	
	// Definimos las constantes de la clave
	final private String KEYSET = "ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789";
	final private int KEYSIZE = 8;
	
	String id;

	Player red;
	Player blue;
		
	public Lobby(){
		this.id = generate_Id();
		
		System.out.println("Lobby creado: " + id);
	}
	
	public void addPlayer(Player p) {
		if (!this.isFull()){
			if(red == null)
				red = p;
			else if(blue == null)
				blue = p;
		}
	}
	
	public void handleMessage(TextMessage message, String session) throws IOException{
		if (red != null && !red.getWss().equals(session)){
			System.out.println("Mandando a ROJO");
			this.red.send(message);
		}
			
		
		if (blue != null && !blue.getWss().equals(session)) {
			System.out.println("Mandando a AZUL");
			this.blue.send(message);
		}
			
	}
	
	public void remove(WebSocketSession session)
	{
		if (this.red != null && this.red.equals(session)){
			this.red = null;
		}
		
		if (this.blue != null && this.blue.equals(session)) {
			this.blue = null;
		}
	}
	
	private String generate_Id(){
		String out = "";
		Random r = new Random();
		
		for(int i = 0; i < KEYSIZE-1; i++){
			out += KEYSET.charAt(r.nextInt(KEYSET.length()));
		}
		
		return out;
	}
	
	public Boolean isFull() {
		if(this.red != null && this.blue != null)
			return true;
		else 
			return false;
	}
	
	public Boolean isEmpty() {
		if(this.red == null && this.blue == null)
			return true;
		else
			return false;
	}
	
	public Boolean hasRoom(Player p) {
		if (this.isFull()) {
			return false;
		} else if(this.red == null){
			this.red = p;
			return true;
		} else if(this.blue == null) {
			this.blue = p;
			return true;
		} else {
			return false;
		}
	}
}
