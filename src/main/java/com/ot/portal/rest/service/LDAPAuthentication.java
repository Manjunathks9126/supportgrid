package com.ot.portal.rest.service;

import com.ot.portal.entity.ServiceReg;
import com.ot.portal.entity.security.AuthRequest;
import com.ot.portal.entity.security.PersonEntity;
import com.ot.portal.exception.SGPortalException;
import com.ot.portal.vo.SGPortalResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface LDAPAuthentication {

    ResponseEntity authenticateUser(AuthRequest authRequest, String requestOrigin) throws SGPortalException;

    Map<String, List<String>> registerService(ServiceReg service) throws SGPortalException;

    SGPortalResponse<PersonEntity> validateToken(String token) throws SGPortalException;

    SGPortalResponse<String> invalidateToken(String token) throws SGPortalException;

    SGPortalResponse<PersonEntity> getUser(String token) throws SGPortalException;
}
