package es.digitalconfetti.server.game;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import es.digitalconfetti.elements.Player;
import es.digitalconfetti.elements.Lobby;

public class WebsocketTTHandler extends TextWebSocketHandler {
	
	private ObjectMapper mapper = new ObjectMapper();
	
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	
	private Map<String, Lobby> lobbys = new ConcurrentHashMap();
	
	private List<Player> waitingLobby = new ArrayList<>();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		String in = session.getId();
		System.out.println("New session: " + in);
		sessions.put(session.getId(), session);
		
		Player aux = new Player(session);
		waitingLobby.add(aux);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
	
		JsonNode node = mapper.readTree(message.getPayload());
		Boolean encontrado = false;
		for(Entry<String, Lobby> ses: lobbys.entrySet()){
			if(ses.getKey().equals(session.getId())){
				ses.getValue().handleMessage();
				encontrado = true;
			}
		}
		
		if (!encontrado){
			
		}
		
		if(checkConnection(session)){
			System.out.println("Message received: " + message.getPayload());
			sendOtherParticipants(session, message.getPayload());
			
		} else if(message.getPayload().equals("/a")) {
				setConnection(session);
		}
	}
	
	private void sendOtherParticipants(WebSocketSession session, String payload) throws IOException {
		for(WebSocketSession participant : sessions.values()) {
			if(participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(payload));
			}
		}
	}
	
	private Boolean checkConnection(WebSocketSession session) {
		Iterator<Player> it = this.waitingLobby.iterator();
		
		while(it.hasNext()){
			Player i = it.next();
			if(i.equals(session)) return i.isConnected();
		}
		
		return null;
	}
	
	private void setConnection(WebSocketSession session) {
		Iterator<Player> it = this.waitingLobby.iterator();
		
		while(it.hasNext()){
			Player i = it.next();
			if(i.equals(session))
				i.connect();
		}
		
	}
	
}
