package com.ot.portal.rest.service;


import com.ot.portal.entity.ServiceReg;
import com.ot.portal.entity.UserRole;
import com.ot.portal.entity.security.Authority;
import com.ot.portal.exception.SGPortalException;
import com.ot.portal.repository.UserRoleRepo;
import com.ot.portal.vo.Tile;
import com.ot.portal.vo.TileContent;
import com.ot.portal.vo.TileHeader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TileServiceImpl {

	
	private static final Logger LOGGER = LoggerFactory.getLogger(TileServiceImpl.class);
	
    @Autowired
    UserRoleRepo userRoleRepo;

    public List<Tile> getTiles(List<Authority> authorities) throws SGPortalException {
    	LOGGER.info("SUPPORT-GRID-PORTAL TileServiceImpl.class","getTiles() Start");
        List<UserRole> userRoleList = userRoleRepo.findByLdapAuthorityNameIn(authorities.stream().map(info -> info.getAuthority()).collect(Collectors.toList()));

        if(null == userRoleList || userRoleList.isEmpty()){
            LOGGER.error("SUPPORT-GRID-PORTAL TileServiceImpl.class","getTiles()","Could not find any services related to user roles");
            throw new SGPortalException(HttpStatus.NOT_FOUND,"SUPPORT-GRID-PORTAL","Could not find any services related to user roles");
        }
        Set<ServiceReg> services = userRoleList.stream()
                .map(userRole -> userRole.getServiceReg())
                .flatMap(Collection::stream)
                .collect(Collectors
                        .toCollection(()->new TreeSet<>(Comparator
                                .comparingLong(ServiceReg::getServiceId))));
        Comparator<ServiceReg> comparator = (ServiceReg s1, ServiceReg s2)-> s2.getCreatedTimeStamp().compareTo(s1.getCreatedTimeStamp());
        ArrayList<ServiceReg> serveList = new ArrayList<>(services);
        Collections.sort(serveList, comparator);
        LOGGER.info("SUPPORT-GRID-PORTAL TileServiceImpl.class","getTiles()","The tiles data is :" +serveList);
        return generateTiles(serveList);
    }

//TO-DO : Fix below swapping 
    private List<Tile> generateTiles(List<ServiceReg> services) {
        List<Tile> tileList = new ArrayList<>(services.size());
        int index = -1;
        
        for (ServiceReg service : services) {
        	if(service.getServiceName().equals("New Service")) {index = services.indexOf(service);}
            tileList.add(new Tile(
                    service.getServiceId(),
                    service.getServiceUrl(),
                    new TileHeader()
                            .setDisplayText(service.getDisplayName())
                            .setIconImageSrc(service.getTileIcon()),
                    new TileContent().setIconImageSrc(service.getTileIcon())));
        }
        if(index != -1) {
        	Collections.swap(tileList, index, 0);
        }
        return tileList;
    }
}
