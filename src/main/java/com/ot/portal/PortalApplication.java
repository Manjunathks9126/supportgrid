
package com.ot.portal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class PortalApplication extends SpringBootServletInitializer {
    private final static Logger logger = LoggerFactory.getLogger(PortalApplication.class);
    public static void main(String[] args) {
        SpringApplication.run(PortalApplication.class, args);
        logger.info("SupportGrid-Portal initialized");
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(PortalApplication.class);
    }
}
