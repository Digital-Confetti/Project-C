package es.digitalconfetti.elements;

import java.util.Random;

public class Lobby {
	
	// Definimos las constantes de la clave
	final private String KEYSET = "ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789";
	final private int KEYSIZE = 8;
	
	String id;

	Player red;
	Player blue;
		
	public Lobby(){
		this.id = generate_Id();
	}
	
	public void addPlayer(Player p) {
		if (!this.isFull()){
			if(red == null)
				red = p;
			else if(blue == null)
				blue = p;
		}
	}
	
	public void handleMessage(){
		//TODO
	}
	
	// Genera una ID
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
}
