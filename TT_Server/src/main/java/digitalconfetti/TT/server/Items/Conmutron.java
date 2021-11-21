package digitalconfetti.TT.server.Items;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

// Begin KSP reference into here
public class Conmutron {
// End KSP reference
	
	@Autowired
	private List<Lobby> lobbyList = new ArrayList<Lobby>();
	
	private Lobby active;
	
	private final int lobbySize = 4;
	
	public Conmutron() {
		//Nada mas crear el Objeto creamos el primer lobby
		this.active = new Lobby(lobbySize);
		//Añadimos el lobby a la lsta de lobbys
		this.lobbyList.add(0, this.active);
	}
	
	public void checkActivelLobby()
	{
		lobbyList.forEach((lobby) -> {
			if (lobby.getNumPlayers() < this.lobbySize) {
				this.active = lobby;
			}
		});
	}
	
	//Funcionalidad asociada a añadir un jugador al lobby activo
	public String addPlayer( String name) {
		Lobby active = this.lobbyList.get(0);
		if(active.getNumPlayers() < this.lobbySize)
		{
			String aux = active.addPlayer(name);
			return aux;
		} else {
			
		}
		return name;
	}
	
	//newMessage()
	
	//getMessages()

}
