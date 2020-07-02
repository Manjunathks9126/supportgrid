package com.ot.portal.rest.controller;

import com.ot.portal.entity.security.PersonEntity;
import com.ot.portal.exception.SGPortalException;
import com.ot.portal.rest.service.TileServiceImpl;
import com.ot.portal.vo.SGPortalResponse;
import com.ot.portal.vo.Tile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class TileController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserAuthenticationController.class);

    @Autowired
    TileServiceImpl tileService;

    @GetMapping("/tiles")
    public SGPortalResponse<List<Tile>> getTiles(HttpServletRequest request) throws SGPortalException {
        LOGGER.info("SUPPORT-GRID-PORTAL TileController.class", "getTiles() Start");
        PersonEntity userDetails = (PersonEntity) request.getAttribute("user");
        List<Tile> tiles = tileService.getTiles(userDetails.getAuthorities());
        LOGGER.info("SUPPORT-GRID-PORTAL TileController.class", "getTiles() End");
        return new SGPortalResponse<>("success", HttpStatus.OK, HttpStatus.OK.value(), tiles);
    }
}
