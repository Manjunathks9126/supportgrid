package com.ot.portal.entity.security;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {
    String userid;
    String password;
    String client_id;
    String client_secret;
}
