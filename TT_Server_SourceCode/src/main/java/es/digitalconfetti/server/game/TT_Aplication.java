package es.digitalconfetti.server.game;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class TT_Aplication implements WebSocketConfigurer {

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(echoHandler(), "/TT")
			.setAllowedOrigins("*");
	}
	
	@Bean
	public WebsocketTTHandler echoHandler() {
		return new WebsocketTTHandler();
	}
	public static void main(String[] args) {
		SpringApplication.run(TT_Aplication.class, args);
	}

}
