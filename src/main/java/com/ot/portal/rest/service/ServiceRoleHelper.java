package com.ot.portal.rest.service;


import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.ot.portal.dao.UserRoleDAOImpl;
import com.ot.portal.entity.UserRole;
import com.ot.portal.exception.SGPortalException;

@Service
public class ServiceRoleHelper {

	private static final Logger LOGGER = LoggerFactory.getLogger(ServiceRoleHelper.class);
	
    @Autowired
    UserRoleDAOImpl userRoleDao;

    public List<UserRole> retrieveRoles() throws SGPortalException {
    	LOGGER.debug("ServiceRoleHelper.class","retrieveRoles() Start");
    	try {
        return userRoleDao.getRoles();
    	} catch (Exception e) {
    		LOGGER.error("ServiceRoleHelper.class"," retrieveRoles() "," Exception :"+ e); 
            throw new SGPortalException(e, HttpStatus.INTERNAL_SERVER_ERROR, "ServiceRoleHelper::retrieveRoles | Error while retrievung roles");
        }
    }

}
