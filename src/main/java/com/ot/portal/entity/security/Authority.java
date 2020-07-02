package com.ot.portal.entity.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

@Getter
@Setter
public class Authority implements GrantedAuthority {
    private String authority;
}
