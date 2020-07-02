package com.ot.portal.rest.controller;

import com.ot.portal.config.properties.ApplicationProperties;
import com.ot.portal.entity.security.AuthRequest;
import com.ot.portal.exception.SGPortalException;
import com.ot.portal.rest.service.LDAPAuthentication;
import com.ot.portal.vo.SGPortalResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;


@RestController
public class UserAuthenticationController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserAuthenticationController.class);

    final
    LDAPAuthentication auth;

    final
    ApplicationProperties properties;

    @Value("${CHANGE_PWD_URL}")
    public String CHANGE_PWD_URL;

    public UserAuthenticationController(LDAPAuthentication auth, ApplicationProperties properties) {
        this.auth = auth;
        this.properties = properties;
    }

    @PostMapping(value = "/signin", produces = "application/json")
    public ResponseEntity login(@RequestBody AuthRequest authRequest, HttpServletResponse response,HttpServletRequest request) throws SGPortalException {
        LOGGER.info("SUPPORT-GRID-PORTAL UserAuthenticationController", "Login() start", "UserName :" + authRequest.getUserid());
        authRequest.setClient_id(properties.CLIENT_ID);
        authRequest.setClient_secret(properties.CLIENT_SECRET);
        String requestOrigin = request.getHeader("origin");
        ResponseEntity gatewayResponse = auth.authenticateUser(authRequest,requestOrigin);
        LOGGER.info("SUPPORT-GRID-PORTAL UserAuthenticationController","Login response :" + response);
        return gatewayResponse;
    }

    @PostMapping(value = "/signout", produces = "application/json")
    public SGPortalResponse<Object> logout(HttpServletRequest request, HttpServletResponse response) throws SGPortalException {
        LOGGER.info("SUPPORT-GRID-PORTAL UserAuthenticationController.class ", "logout()");
        return handleLogOutResponse(request, response);
    }

    private SGPortalResponse<Object> handleLogOutResponse(HttpServletRequest request, HttpServletResponse httpResponse) throws SGPortalException {
        LOGGER.info("SUPPORT-GRID-PORTAL UserAuthenticationController.class ", "handleLogOutResponse() start");
        HttpSession session = request.getSession(false);
        if (request.isRequestedSessionIdValid() && session != null) {
            session.invalidate();
        }
        Cookie[] cookies = request.getCookies();
        Map<String, Object> response = new HashMap<>();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(properties.COOKIE_NAME)) {
                response.put("response", auth.invalidateToken(cookie.getValue()));
                cookie.setMaxAge(0);
                cookie.setPath("/");
                cookie.setValue(null);
                httpResponse.addCookie(cookie);
                SecurityContextHolder.getContext().setAuthentication(null);
                break;
            }
        }
        LOGGER.info("UserAuthenticationController.class ", "handleLogOutResponse() End");
        return new SGPortalResponse<>("success", HttpStatus.OK, HttpStatus.OK.value(), response);
    }

    @GetMapping(value = "/user", produces = "application/json")
    public SGPortalResponse<Object> getUser(HttpServletRequest request) {
        LOGGER.info("SUPPORT-GRID-PORTAL UserAuthenticationController.class ", "getUser()");
        return new SGPortalResponse<>("success", HttpStatus.OK, HttpStatus.OK.value(), request.getAttribute("user"));
    }


    @GetMapping(value = "/changePasswordUrl", produces = "application/json")
    public SGPortalResponse<Object> getChangePasswordUrl(HttpServletRequest request) {
        LOGGER.info("SUPPORT-GRID-PORTAL UserAuthenticationController.class ", "getChangePasswordUrl()", "URL:" + CHANGE_PWD_URL);
        return new SGPortalResponse<>("success", HttpStatus.OK, HttpStatus.OK.value(), CHANGE_PWD_URL);
    }
}