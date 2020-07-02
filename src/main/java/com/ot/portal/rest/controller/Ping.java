package com.ot.portal.rest.controller;

import com.ot.portal.config.properties.ApplicationProperties;
import com.ot.portal.dao.UserRoleDAOImpl;
import com.ot.portal.entity.UserRole;
import com.ot.portal.repository.UserRoleRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class Ping {

    @Autowired
    UserRoleRepo userRoleRepo;
    private static final Logger LOGGER = LoggerFactory.getLogger(Ping.class);
    @Autowired
    UserRoleDAOImpl userRoleDao;
    @Autowired
    JdbcTemplate jdbcTemplate;


    @Autowired
    ApplicationProperties properties;

    @Autowired
    UserRoleDAOImpl userRoleDAO;


    @GetMapping(value="ping")
    public Map<String,String> ping() throws Exception {
        System.out.println(userRoleDao.getRoles());
        LOGGER.info("SUPPORT-GRID-PORTAL  ping service invoked");
        Map<String,String> response = new HashMap<>();
        response.put("response","SupportGrid Portal app is up");
    return response;
    }

    @GetMapping(value="index")
    public String index(){
        return "index";
    }


    @GetMapping(value = "updateAdminRole")
    public Map<String,Object> updateAdminRole(@RequestParam String adminRoleKey,@RequestParam String adminRoleValue, @RequestParam (value = "access") String access) {
        Map<String,Object> response = new HashMap<>();
        if (null != access && access.equalsIgnoreCase(properties.ACCESS_CODE)){
            try{
                final UserRole adminRole = userRoleRepo.findByLdapAuthorityNameContaining(adminRoleKey);
                adminRole.setLdapAuthorityName(adminRoleValue);
                final UserRole save = userRoleRepo.save(adminRole);
                response.put("success",save);
            }catch (Exception e){
                response.put("failure",e.getMessage());
                return response;
            }
        }else {
            response.put("message","access denied");
        }
        return response;
    }

    @GetMapping(value = "deleteRole")
        public Map<String,Object> deleteRole(@RequestParam String adminRoleKey, @RequestParam (value = "access") String access) {
        Map<String,Object> response = new HashMap<>();
        if (null != access && access.equalsIgnoreCase(properties.ACCESS_CODE)){
            try{
                final UserRole adminRole = userRoleRepo.findByLdapAuthorityNameContaining(adminRoleKey);
                userRoleDAO.deleteMappingRoles(adminRole.getRoleId());
                userRoleRepo.delete(adminRole);
                response.put("success","deleted");
            }catch (Exception e){
                response.put("failure",e.getMessage());
                return response;
            }
        }else {
            response.put("message","access denied");
        }
        return response;
    }

}
