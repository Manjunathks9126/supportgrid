package com.ot.portal.config.jpa;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jmx.export.annotation.AnnotationMBeanExporter;
import org.springframework.jmx.support.RegistrationPolicy;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableTransactionManagement
public class SupportGridJPAConfig {

    @Value("${jdbc.url}")
    private String JDBC_URL;

    @Value("${jdbc.className}")
    private String DRIVER_CLASS_NAME;

    @Value("${jdbc.username}")
    private String JDBC_USERNAME;

    @Value("${jdbc.password}")
    private String JDBC_PWD;

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory    () {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource());
        em.setPackagesToScan(new String[] { "com.ot.portal.entity" });

        JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        em.setJpaProperties(additionalProperties());

        return em;
    }


    @Bean
        public PlatformTransactionManager transactionManager(EntityManagerFactory emf) {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(emf);
        return transactionManager;
    }

    @Bean(name = "jdbcTemplate")
    @Primary
    public JdbcTemplate getjdbcTemplate() {
        return new JdbcTemplate(dataSource());
    }

    @Bean
    public PersistenceExceptionTranslationPostProcessor exceptionTranslation() {
        return new PersistenceExceptionTranslationPostProcessor();
    }

    @Bean
    public AnnotationMBeanExporter annotationMBeanExporter() {
        AnnotationMBeanExporter annotationMBeanExporter = new AnnotationMBeanExporter();
        annotationMBeanExporter.setRegistrationPolicy(RegistrationPolicy.IGNORE_EXISTING);
        return annotationMBeanExporter;
    }



    @Bean()
    public DataSource dataSource() {
        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.url(JDBC_URL);
        dataSourceBuilder.driverClassName(DRIVER_CLASS_NAME);
        dataSourceBuilder.username(JDBC_USERNAME);
        dataSourceBuilder.password(JDBC_PWD);
        return dataSourceBuilder.build();
    }

    private Properties additionalProperties() {
        Properties properties = new Properties();
        properties.put("hibernate.dialect", "org.hibernate.dialect.Oracle10gDialect");
        properties.put("hibernate.cache.provider_class", "org.hibernate.cache.NoCacheProvider");
        properties.put("hibernate.current_session_context_class", "thread");
        properties.put("hibernate.show_sql", "true");
        properties.put("hibernate.jdbc.use_get_generated_keys", "true");
        properties.put("hibernate.jdbc.batch_size ", "50");
        return properties;
    }

}
