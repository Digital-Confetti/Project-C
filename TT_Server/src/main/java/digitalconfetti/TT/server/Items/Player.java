package digitalconfetti.TT.server.Items;

public class Player {
	
	//Nombre del jugador
	private String name;
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public Player(String name) {
		this.setName(name);
	}
}
