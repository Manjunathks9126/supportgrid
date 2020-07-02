package com.ot.portal.vo;

import lombok.*;
import org.springframework.http.HttpStatus;


@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SGPortalResponse<T> {

    private String message;
    private HttpStatus status;
    private int statusCode;
    private T response;

    public SGPortalResponse<T> builder(){
        return this;
    }
    public SGPortalResponse<T> setMessage(String message) {
        this.message = message;
        return this;
    }

    public SGPortalResponse<T> setStatus(HttpStatus status) {
        this.status = status;
        return this;
    }

    public SGPortalResponse<T> setStatusCode(int statusCode) {
        this.statusCode = statusCode;
        return this;
    }

    public SGPortalResponse<T> setResponse(T response) {
        this.response = response;
        return this;
    }
}
