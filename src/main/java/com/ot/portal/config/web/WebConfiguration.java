package com.ot.portal.config.web;

import org.apache.tomcat.util.http.LegacyCookieProcessor;
import org.springframework.boot.web.embedded.tomcat.TomcatContextCustomizer;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.*;
import org.springframework.http.CacheControl;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.mvc.WebContentInterceptor;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import java.nio.charset.StandardCharsets;


@Configuration
@ComponentScan(basePackages = "com.ot")
@EnableAspectJAutoProxy
public class WebConfiguration implements WebMvcConfigurer{
    public static final int REST_TIME_OUT = 180 * 1000; // 180 sec
    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver irv = new InternalResourceViewResolver();
        irv.setPrefix("/");
        irv.setSuffix(".html");
        return irv;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(createNoCacheWebContentInterceptor());
    }

    @Bean
    WebServerFactoryCustomizer<TomcatServletWebServerFactory> cookieProcessorCustomizer() {
        return tomcatServletWebServerFactory -> tomcatServletWebServerFactory.addContextCustomizers((TomcatContextCustomizer)
                context -> context.setCookieProcessor(new LegacyCookieProcessor()));
    }

    @Bean
    @Primary
    public RestTemplate customRestTemplate() {
        HttpComponentsClientHttpRequestFactory httpRequestFactory = new HttpComponentsClientHttpRequestFactory();

        httpRequestFactory.setConnectionRequestTimeout(REST_TIME_OUT);
        httpRequestFactory.setConnectTimeout(REST_TIME_OUT);
        httpRequestFactory.setReadTimeout(REST_TIME_OUT);
        RestTemplate restTemplate = new RestTemplate(httpRequestFactory);
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));

        return restTemplate;
    }

    private WebContentInterceptor createNoCacheWebContentInterceptor() {
        CacheControl cacheControl = CacheControl.noStore();
        WebContentInterceptor webContentInterceptor = new WebContentInterceptor();
        webContentInterceptor.setCacheControl(cacheControl);
        return webContentInterceptor;
    }
}
