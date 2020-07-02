package com.ot.portal.rest.controller;


import com.ot.portal.entity.ServiceReg;
import com.ot.portal.entity.UserRole;
import com.ot.portal.entity.security.PersonEntity;
import com.ot.portal.exception.SGPortalException;
import com.ot.portal.rest.service.LDAPAuthenticationImpl;
import com.ot.portal.rest.service.ServiceRoleHelper;
import com.ot.portal.vo.SGPortalResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@RestController
public class ServiceRoleController {

	 private static final Logger LOGGER = LoggerFactory.getLogger(ServiceRoleController.class);
	 
    @Autowired
    ServiceRoleHelper helper;

    @Autowired
    LDAPAuthenticationImpl auth;

    @GetMapping("roles")
    public SGPortalResponse<List<UserRole>> retrieveRoles() throws SGPortalException {
    	LOGGER.info("SUPPORT-GRID-PORTAL ServiceRoleController.class","retrieveRoles() start");
    	List<UserRole> retrieveRoles = helper.retrieveRoles();
    	LOGGER.info("SUPPORT-GRID-PORTAL The roles are : "+retrieveRoles);;
        return new SGPortalResponse<>("success",HttpStatus.OK,HttpStatus.OK.value(), retrieveRoles);
    }
    
    @PostMapping(value = "/service", produces = "application/json")
    public SGPortalResponse<Map<String, List<String>>> registerService(@RequestBody ServiceReg service, HttpServletRequest request) throws SGPortalException {
    	LOGGER.info("SUPPORT-GRID-PORTAL The service data is " + service);
    	service.setCreatedTimeStamp(new Timestamp(System.currentTimeMillis()));
        service.setModifiedTimeStamp(new Timestamp(System.currentTimeMillis()));
        service.setServiceUrl(service.getServiceUrl().trim());
    	PersonEntity userDetails = (PersonEntity) request.getAttribute("user");
    	service.setCreatedBy(userDetails.getUsername());
            SGPortalResponse<Map<String, List<String>>> response = null;
        Map<String, List<String>> serviceRegMap = auth.registerService(service);
        if(serviceRegMap.containsKey("SUCCESS")){
            response = new SGPortalResponse<>("success",HttpStatus.OK,HttpStatus.OK.value(), serviceRegMap);
        }else {
            response = new SGPortalResponse<>("info",HttpStatus.OK,HttpStatus.OK.value(), serviceRegMap);
        }
        LOGGER.debug("ServiceRoleController.class","registerService() End "+"Response :"+response);
        return response;
        
    }
}
