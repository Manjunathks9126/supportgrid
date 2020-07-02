package com.ot.portal.entity.security;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;


@Getter
@Setter
@ToString
public class PersonEntity {

    private String username;

    private List<Authority> authorities;

    private Date creationDate;
    
    private String jwtBody;
    


}


