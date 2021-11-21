package digitalconfetti.TT.server.Items;

public class Message {
	
	//fecha en la que ha sido emitido el mensaje
	private String date;
	
	//cadena en la que guardaremos el texto del mensaje
	private String text;
	
	//usuario emisor del mensaje
	private String user;
	
	public Message(String user, String date, String text){
		this.setDate(date);
		this.setText(text);
		this.setUser(user);
	}
	
	public String toString() {
		String out = this.date + "-" + this.user + ": " + this.text;
		return out;
	}
	public String toCsv(String lobby_id, String separator){
		String out = lobby_id + separator + this.user + separator + this.date + separator + this.text + '\n';
		return out;
	}
	
	//getters and setters
	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

}
