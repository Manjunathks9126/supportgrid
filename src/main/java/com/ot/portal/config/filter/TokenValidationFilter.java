package com.ot.portal.config.filter;

import com.ot.portal.entity.security.LdapPerson;
import com.ot.portal.entity.security.PersonEntity;
import com.ot.portal.rest.service.LDAPAuthenticationImpl;
import com.ot.portal.vo.SGPortalResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class TokenValidationFilter extends OncePerRequestFilter {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(TokenValidationFilter.class);
	
    @Autowired
    LDAPAuthenticationImpl auth;

    @Value("${COOKIE_NAME}")
    private String COOKIE_NAME;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    	LOGGER.debug("TokenValidationFilter.class","doFilterInternal() Start");
        Cookie[] cookies = request.getCookies();
        String token = null;
        if (null != cookies) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(COOKIE_NAME)) {
                    token = cookie.getValue();
                    break;
                }
            }
        }
        if (null != token && !token.isEmpty()) {
            try {
            	SGPortalResponse<PersonEntity> portalResponse = auth.validateToken(token);
            	PersonEntity userDetails = portalResponse.getResponse();
                request.setAttribute("user", userDetails);
                LdapPerson person = new LdapPerson(userDetails.getUsername(), userDetails.getCreationDate(), userDetails.getAuthorities());
                LOGGER.info("TokenValidationFilter.class","doFilterInternal()","LdapPerson :"+ person.getUsername()+" person"+person.getAuthorities());
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(person, "", person.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            } catch (Exception e) {
            	LOGGER.error("TokenValidationFilter.class","doFilterInternal()","Exception :"+ e);
            }
        }
        LOGGER.debug("TokenValidationFilter.class","doFilterInternal() End");
        filterChain.doFilter(request, response);
    }
}
