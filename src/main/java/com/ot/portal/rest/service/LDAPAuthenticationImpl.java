package com.ot.portal.rest.service;


import com.ot.portal.config.properties.ApplicationProperties;
import com.ot.portal.dao.UserRoleDAOImpl;
import com.ot.portal.entity.ServiceReg;
import com.ot.portal.entity.UserRole;
import com.ot.portal.entity.security.AuthRequest;
import com.ot.portal.entity.security.PersonEntity;
import com.ot.portal.exception.SGPortalException;
import com.ot.portal.repository.ServiceRegistrationRepo;
import com.ot.portal.repository.UserRoleRepo;
import com.ot.portal.vo.SGPortalResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class LDAPAuthenticationImpl implements LDAPAuthentication {

    private static final Logger LOGGER = LoggerFactory.getLogger(LDAPAuthenticationImpl.class);

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    ApplicationProperties properties;

    @Autowired
    ServiceRegistrationRepo serviceRepo;

    @Autowired
    UserRoleRepo userRoleRepo;

    @Autowired
    UserRoleDAOImpl userRoleDao;

    private HttpHeaders gatewayHeaders(){
        HttpHeaders headers = new HttpHeaders();
        headers.add("x-ottg-caller-application","SG-Portal");
        headers.add("x-ottg-caller-application-timestamp",LocalDateTime.now().toString());
        headers.add("x-ottg-caller-application-host",properties.GATEWAY_URL);
        return headers;
    }
    @Override
    public ResponseEntity authenticateUser(AuthRequest authRequest, String requestOrigin) throws SGPortalException {
        LOGGER.info("SUPPORT-GRID-PORTAL", "LDAPAuthenticationImpl authenticateUser() Start", "authRequest :" + authRequest.getUserid());
        try {
            HttpHeaders headers = gatewayHeaders();
            headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED.toString());
            if (null != requestOrigin)
                headers.add("Origin", requestOrigin);
            MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
            requestBody.add("userid", authRequest.getUserid());
            requestBody.add("password", authRequest.getPassword());
            requestBody.add("clientId", authRequest.getClient_id());
            requestBody.add("clientSecret", authRequest.getClient_secret());

            ResponseEntity<String> responseEntity = restTemplate.exchange(
                    properties.GATEWAY_URL + "/supportgrid-portal/login", HttpMethod.POST, new HttpEntity<>(requestBody, headers)
                    , new ParameterizedTypeReference<String>() {
                    });
            return responseEntity;
        } catch (HttpClientErrorException e) {
            LOGGER.error("SUPPORT-GRID-PORTAL LDAPAuthenticationImpl.class", "authenticateUser() Exception: " + e);
            if (null != e.getStatusCode() && e.getStatusCode().equals(org.springframework.http.HttpStatus.NOT_FOUND)) {
                throw new SGPortalException(e, HttpStatus.NOT_FOUND, "LDAPAuthenticationImpl::authenticateUser | Invalid user credentilas");
            } else if (e.getStatusCode() != null && e.getStatusCode().equals(org.springframework.http.HttpStatus.UNAUTHORIZED)) {
                throw new SGPortalException(e, HttpStatus.UNAUTHORIZED, "LDAPAuthenticationImpl::authenticateUser | This user not authorised to access this app");
            }
        }
        return null;
    }


    @Override
    public Map<String, List<String>>    registerService(ServiceReg service) throws SGPortalException {
        LOGGER.info("SUPPORT-GRID-PORTAL LDAPAuthenticationImpl.class", "registerService() Start", "service :" + service);
        Map<String, List<String>> responseMap = new HashMap<>(1);
        try {
            final ServiceReg byServiceUrl = serviceRepo.findByServiceUrl(service.getServiceUrl());
            LOGGER.info("Service already exist with given URL :: " + service.getServiceUrl());
            if (null != byServiceUrl) {
                final Set<UserRole> userRoles = prepareRoleObject(service.getRoleName());
                Map<String, List<String>> preExistingServices = getPreExistingServices(userRoles, byServiceUrl);
                byServiceUrl.getUserRole().addAll(userRoles);
                serviceRepo.save(byServiceUrl);
                this.refreshRoutes();
                return preExistingServices;
            } else {
                service.setUserRole(prepareRoleObject(service.getRoleName()));
                serviceRepo.save(service);
                this.refreshRoutes();
                responseMap.put("SUCCESS", null);
                return responseMap;
            }
        } catch (Exception e) {
            LOGGER.error("SUPPORT-GRID-PORTAL LDAPAuthenticationImpl.class", "registerService()", " Exception :" + e);
            throw new SGPortalException(e, HttpStatus.INTERNAL_SERVER_ERROR, "LDAPAuthenticationImpl::registerService | Error while saving service");
        }
    }

    private Map<String, List<String>> getPreExistingServices(Set<UserRole> userRoles, ServiceReg byServiceUrl) {
        Map<String, List<String>> alreadyMappedRoles = new HashMap<>(1);
        final List<UserRole> preExistRoles = userRoles.stream().filter(role -> role.isPreExist()).collect(Collectors.toList());
        List<String> mappedRoles = new ArrayList<>(preExistRoles.size());
        byServiceUrl.getUserRole().forEach(userRole -> {
            Optional<UserRole> any = preExistRoles.stream().filter(role -> role.getRoleId().equals(userRole.getRoleId())).findAny();
            if (any.isPresent()) {
                mappedRoles.add(any.get().getLdapAuthorityName());
            }
        });
        if (!mappedRoles.isEmpty()) {
            alreadyMappedRoles.put(byServiceUrl.getServiceUrl(), mappedRoles);
        }
        if (alreadyMappedRoles.isEmpty()) {
            alreadyMappedRoles.put("SUCCESS", null);
        }
        return alreadyMappedRoles;
    }

    @Override
    public SGPortalResponse<PersonEntity> validateToken(String token) throws SGPortalException {
        LOGGER.info("SUPPORT-GRID-PORTAL LDAPAuthenticationImpl.class", "validateToken() Start", "token :" + token);
        try {
            ResponseEntity<SGPortalResponse<PersonEntity>> responseEntity = restTemplate.exchange(
                    properties.AUTHZ_SERVER_URL + "validateToken", HttpMethod.POST, new HttpEntity<String>("Headers", authzHeader(token))
                    , new ParameterizedTypeReference<SGPortalResponse<PersonEntity>>() {
                    });
            return responseEntity.getBody();
        } catch (Exception e) {
            LOGGER.error("LDAPAuthenticationImpl.class", " validateToken()", "Exception: " + e);
            throw new SGPortalException(e, HttpStatus.INTERNAL_SERVER_ERROR, "LDAPAuthenticationImpl::validateToken | Error while validate token");
        }
    }

    @Override
    public SGPortalResponse<String> invalidateToken(String token) throws SGPortalException {
        LOGGER.info("SUPPORT-GRID-PORTAL LDAPAuthenticationImpl.class", "invalidateToken() Start", "token :" + token);
        try {
            ResponseEntity<SGPortalResponse<String>> responseEntity = restTemplate.exchange(properties.AUTHZ_SERVER_URL + "invalidateToken", HttpMethod.POST,
                    new HttpEntity<String>("Headers", tokenInvalidateHeader(token, properties.CLIENT_ID)), new ParameterizedTypeReference<SGPortalResponse<String>>() {
                    });
            return responseEntity.getBody();
        } catch (Exception e) {
            LOGGER.error("SUPPORT-GRID-PORTAL LDAPAuthenticationImpl.class", " invalidateToken()", "Exception: " + e);
            throw new SGPortalException(e, HttpStatus.INTERNAL_SERVER_ERROR, "LDAPAuthenticationImpl::invalidateToken | Error while invalidating token");
        }
    }


    @Override
    public SGPortalResponse<PersonEntity> getUser(String token) throws SGPortalException {
        LOGGER.info("SUPPORT-GRID-PORTAL LDAPAuthenticationImpl.class", "getUser() Start", "token :" + token);
        try {
            ResponseEntity<SGPortalResponse<PersonEntity>> responseEntity = restTemplate.exchange(
                    properties.AUTHZ_SERVER_URL + "user", HttpMethod.POST, new HttpEntity<String>("Headers", authzHeader(token)),
                    new ParameterizedTypeReference<SGPortalResponse<PersonEntity>>() {
                    });
            return responseEntity.getBody();
        } catch (Exception e) {
            LOGGER.error("SUPPORT-GRID-PORTAL LDAPAuthenticationImpl.class", " getUser()", "Exception: " + e);
            throw new SGPortalException(e, HttpStatus.INTERNAL_SERVER_ERROR, "LDAPAuthenticationImpl::getUser | Error while retrievung roles");
        }
    }

    private String refreshRoutes() throws SGPortalException {
        LOGGER.info("SUPPORT-GRID-PORTAL LDAPAuthenticationImpl.class", "refreshRoutes() Start", "gateway");
        try {
            ResponseEntity<String> responseEntity = restTemplate.exchange(
                    properties.GATEWAY_URL + "refreshroutes", HttpMethod.GET, null,
                    new ParameterizedTypeReference<String>() {
                    });
            return responseEntity.getBody();
        } catch (Exception e) {
            LOGGER.error("SUPPORT-GRID-PORTAL LDAPAuthenticationImpl.class", " getUser()", "Exception: " + e);
            throw new SGPortalException(e, HttpStatus.INTERNAL_SERVER_ERROR, "LDAPAuthenticationImpl::getUser | Error while retrievung roles");
        }
    }

    private HttpHeaders authzHeader(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.add("x-ottg-caller-application","SG-Portal");
        headers.add("x-ottg-caller-application-timestamp",LocalDateTime.now().toString());
        headers.add("x-ottg-caller-application-host",properties.GATEWAY_URL);
        LOGGER.info("SUPPORT-GRID-PORTAL LDAPAuthenticationImpl.class", "authzHeader()", "headers " + headers.toString());
        return headers;
    }

    private HttpHeaders tokenInvalidateHeader(String token, String clientId) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("clientId", clientId);
        headers.add("x-ottg-caller-application","SG-Portal");
        headers.add("x-ottg-caller-application-timestamp",LocalDateTime.now().toString());
        headers.add("x-ottg-caller-application-host",properties.GATEWAY_URL);
        LOGGER.info("SUPPORT-GRID-PORTAL LDAPAuthenticationImpl.class", "tokenInvalidateHeader()", "headers " + headers.toString());
        return headers;
    }


    private Set<UserRole> prepareRoleObject(String roleNames) {
        if (roleNames != null && !roleNames.equals("")) {
            if (roleNames.contains(";")) {
                String[] roles = roleNames.split(";");
                return prepareRoleData(roles);
            } else {
                String[] roles = {roleNames};
                return prepareRoleData(roles);
            }
        }
        return Collections.emptySet();
    }

    private Set<UserRole> prepareRoleData(String[] roles) {
        Set<UserRole> rolesData = new HashSet<>();
        for (String role : roles) {
            UserRole userRole = new UserRole();
            userRole.setRoleName(role.trim());
            userRole.setLdapAuthorityName(role.trim());
            userRole.setRoleDescription(role.trim());
            userRole.setCreatedTimeStamp(new Timestamp(System.currentTimeMillis()));
            userRole.setModifiedTimeStamp(new Timestamp(System.currentTimeMillis()));
            rolesData.add(userRole);
        }
        return validateRolesInDb(rolesData);
    }

    private Set<UserRole> validateRolesInDb(Set<UserRole> roles) {
        Set<UserRole> userRoles = new HashSet<>();
        for (UserRole role : roles) {
            UserRole existRole = userRoleRepo.findByLdapAuthorityName(role.getLdapAuthorityName());
            if (null != existRole) {
                existRole.setPreExist(true);
                userRoles.add(existRole);
            } else {
                UserRole savedRole = userRoleRepo.save(role);
                userRoles.add(savedRole);
            }

        }
        return userRoles;

    }
}
