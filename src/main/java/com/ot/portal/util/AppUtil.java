package com.ot.portal.util;


import org.springframework.stereotype.Service;

@Service
public class AppUtil {

    public static String stackTraceToString(Throwable e) {
        StringBuilder sb = new StringBuilder();
        sb.append(e.getMessage());
        sb.append("\n");
        for (StackTraceElement element : e.getStackTrace()) {
            sb.append(element.toString());
            sb.append("\n");
        }
        return sb.toString();
    }
    
    public static boolean isNotNULL(String field) {
        if (null != field && !field.isEmpty()) {
            return true;
        } else {
            return false;
        }
    }
}
