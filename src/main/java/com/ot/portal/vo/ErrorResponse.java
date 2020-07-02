package com.ot.portal.vo;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@AllArgsConstructor
public class ErrorResponse {

    private String errorMessage;
    private HttpStatus status;
    @JsonIgnore
    private String stacktrace;


    public ErrorResponse setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
        return this;
    }

    public ErrorResponse setStatus(HttpStatus status) {
        this.status = status;
        return this;
    }

    public ErrorResponse setStacktrace(String stacktrace) {
        this.stacktrace = stacktrace;
        return this;
    }
}
