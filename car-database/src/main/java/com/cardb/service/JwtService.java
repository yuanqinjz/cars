package com.cardb.service;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtService {
	static final long EXPIRATIONTIME = 86400000;   // 1 day in ms. Should be shorter in production.
	static final String PREFIX = "Bearer";
	
	static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	
	public String getToken(String userName) {
		String token = Jwts.builder().setSubject(userName)
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
				.signWith(key)
				.compact();

		return token;	
	}
	
	public String getAuthUser(String jwtToken) {
		if(jwtToken != null) {
			String user = Jwts.parserBuilder()
					.setSigningKey(key)
					.build()
					.parseClaimsJws(jwtToken)
					.getBody().getSubject();
			if (user != null)
		        return user;
		}
		return null;
	}

}
