package com.cardb.web;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.cardb.service.JwtService;


@Controller
public class LoginController {
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	
	public LoginController(JwtService jwtService, AuthenticationManager authenticationManager) {
		super();
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
	}
	
	@PostMapping("/login")
    public ResponseEntity<?> getToken(@RequestBody AccountCredentialsDto credentials) {
    // Generate token and send it in the response Authorization header
		UsernamePasswordAuthenticationToken creds = 
				new UsernamePasswordAuthenticationToken(credentials.username(), credentials.password());
		Authentication auth = authenticationManager.authenticate(creds);
		String jwts = jwtService.getToken(auth.getName());
		
		return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, "Bearer "+jwts)
				.header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization").build();
	}
	
	
}
