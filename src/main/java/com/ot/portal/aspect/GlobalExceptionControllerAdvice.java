/******************************************************************************
 All rights reserved. All information contained in this software is confidential
 and proprietary to opentext. No part of this software may be
 reproduced or transmitted in any form or any means, electronic, mechanical,
 photocopying, recording or otherwise stored in any retrieval system of any
 nature without the prior written permission of opentext.
 This material is a trade secret and its confidentiality is strictly maintained.
 Use of any copyright notice does not imply unrestricted public access to this
 material.

 (c) opentext
 *******************************************************************************
 Change Log:
 Date          Name                Defect#           Description
 -------------------------------------------------------------------------------
 13/04/2020    msonnad                              Initial Creation
 ******************************************************************************/
package com.ot.portal.aspect;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ot.portal.exception.SGPortalException;
import com.ot.portal.util.AppUtil;
import com.ot.portal.util.LocalizationMessages;
import com.ot.portal.vo.ErrorResponse;
import com.ot.portal.vo.SGPortalResponse;

/**
 * Advice to handle different kind of exceptions which will be thrown across
 * application.
 */

@RestControllerAdvice
public class GlobalExceptionControllerAdvice {

    private static final Logger LOGGEER = LoggerFactory.getLogger(GlobalExceptionControllerAdvice.class);


    @Autowired
    LocalizationMessages localizationMessages;


    @Autowired
    AppUtil util;

    @ExceptionHandler(SGPortalException.class)
    public <T> ResponseEntity<SGPortalResponse<ErrorResponse>> exception(SGPortalException cause) {
    	LOGGEER.error("GlobalExceptionControllerAdvice.class","exception()",cause.getMessage(), util.stackTraceToString(cause));
        ErrorResponse errorResponse = new ErrorResponse(cause.getErrorLog(), cause.getHttpStatus(), util.stackTraceToString(cause));

        SGPortalResponse resp = new SGPortalResponse<ErrorResponse>()
                .builder()
                .setMessage(cause.getHttpStatus().toString())
                .setStatus(cause.getHttpStatus())
                .setResponse(errorResponse).setStatusCode(cause.getHttpStatus().value());


        return new ResponseEntity<>(resp, cause.getHttpStatus());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public <T> ResponseEntity<SGPortalResponse<ErrorResponse>> exception(IllegalArgumentException cause) {
        return getSgAuthzResponseResponseEntity(cause.getMessage(), util.stackTraceToString(cause),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public <T> ResponseEntity<SGPortalResponse<ErrorResponse>> exception(MissingServletRequestParameterException cause) {
        return getSgAuthzResponseResponseEntity(cause.getMessage(), util.stackTraceToString(cause),HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(Exception.class)
    public <T> ResponseEntity<SGPortalResponse<ErrorResponse>> exception(Exception cause) {
        cause.printStackTrace();
        return getSgAuthzResponseResponseEntity(cause.getMessage(), util.stackTraceToString(cause),HttpStatus.INTERNAL_SERVER_ERROR);
    }


    private ResponseEntity<SGPortalResponse<ErrorResponse>> getSgAuthzResponseResponseEntity(String message, String s,HttpStatus status) {
    	LOGGEER.error("GlobalExceptionControllerAdvice.class","getSgAuthzResponseResponseEntity()",message, s);
        ErrorResponse errorResponse = new ErrorResponse(message, status, s);
        SGPortalResponse resp = new SGPortalResponse<ErrorResponse>()
                .builder()
                .setMessage(status.toString())
                .setStatus(status)
                .setResponse(errorResponse)
                .setStatusCode(status.value());

        return new ResponseEntity<>(resp, status);
    }
}