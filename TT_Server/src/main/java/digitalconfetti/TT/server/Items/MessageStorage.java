package digitalconfetti.TT.server.Items;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class MessageStorage {
	
	private String path;
	
	private Lobby lobby;
	
	private String separator = ";";
	
	public MessageStorage(Lobby lobby, String path){
		this.path = path;
		this.lobby = lobby;
	}
	
	public List<Message> ReadMessages(){
		try {
			List<Message> out = new ArrayList<Message>();
			String aux, id = this.lobby.getId();
			BufferedReader reader = new BufferedReader(new FileReader(this.path));
			String[] chop = null;
			
			while ((aux = reader.readLine()) != null){
				chop = aux.split(separator); 
				if (chop[0].equals(id)){
					out.add(new Message(chop[1],chop[2],chop[3]));
				}
			}
			return out;
		} catch (IOException e){
			System.out.println(e);
		}
		return null;
	}
	public List<Message> ReadMessages_inverse(){
		try {
			List<Message> out = new ArrayList<Message>();
			String aux, id = this.lobby.getId();
			BufferedReader reader = new BufferedReader(new FileReader(this.path));
			String[] chop = null;
			
			while ((aux = reader.readLine()) != null){
				chop = aux.split(separator); 
				if (chop[0].equals(id)){
					out.add(0, new Message(chop[1],chop[2],chop[3]));
				}
			}
			return out;
		} catch (IOException e){
			System.out.println(e);
		}
		return null;
	}
	
	public void WriteMessage(Message m){
		try {
			BufferedWriter file = new BufferedWriter(new FileWriter(this.path, true));
			file.write(m.toCsv(lobby.getId(), separator));
			file.close();
		} catch (IOException e){
			System.out.println(e);
		}
	}
}
