package com.ot.portal.config.properties;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ApplicationProperties {

    @Value("${CLIENT_ID}")
    public String CLIENT_ID;
    @Value("${CLIENT_NAME}")
    public String CLIENT_NAME;
    @Value("${CLIENT_SECRET}")
    public String CLIENT_SECRET;
    @Value("${AUTHZ_SERVER_URL}")
    public String AUTHZ_SERVER_URL;  
    @Value("${COOKIE_NAME}")
    public String COOKIE_NAME;
    @Value("${COOKIE_SECURE}")
    public boolean COOKIE_SECURE;
    @Value("${COOKIE_DOMAIN}")
    public String COOKIE_DOMAIN;
    @Value("${GATEWAY_URL}")
    public String GATEWAY_URL;
    @Value("${ACCESS_CODE}")
    public String ACCESS_CODE;
}
