package com.ot.portal.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SGPortalException extends Exception {
	private static final long serialVersionUID = 5761380089718291576L;

	private HttpStatus httpStatus;
	private String errorLog;

	public SGPortalException(HttpStatus httpStatus, String message, String errorLog) {
		super(message);
		this.httpStatus = httpStatus;
		this.errorLog = errorLog;
	}

	public SGPortalException(String message, Throwable cause, HttpStatus httpStatus, String errorLog) {
		super(message, cause);
		this.httpStatus = httpStatus;
		this.errorLog = errorLog;
	}

	public SGPortalException(Throwable cause, HttpStatus httpStatus, String errorLog) {
		super(cause);
		this.httpStatus = httpStatus;
		this.errorLog = errorLog;
	}
}
