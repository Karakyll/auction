package by.auction.config;

import org.hibernate.jpa.HibernatePersistenceProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.Properties;

/**
 * Configuration class for Data source.
 * Including Hibernate configuration and JpaRepositories
 */
@Configuration
@EnableTransactionManagement
@PropertySource("classpath:properties/database.properties")
@ComponentScan(value = {"by.auction.entity", "by.auction.repository", "by.auction.service.implementation"})
@EnableJpaRepositories(basePackages = "by.auction.repository")
public class DataConfig {

    @Value("${jdbc.driverClassName}")
    private String propDatabaseDriver;
    @Value("${jdbc.url}")
    private String propDatabaseUrl;
    @Value("${jdbc.username}")
    private String propDatabaseUsername;
    @Value("${jdbc.password}")
    private String propDatabasePassword;
    @Value("${hibernate.dialect}")
    private String propHibernateDialect;
    @Value("${hibernate.show_sql}")
    private String propHibernateShowSql;
    @Value("${hibernate.packages.to.scan}")
    private String propEntitymanagerPackagesToScan;
    @Value("${hibernate.hbm2ddl.auto}")
    private String propHibernateHbm2DdlAuto;

    /**
     * Bean for dataSource
     * Configure params: jdbc-driver, url, username, password
     */
    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();

        dataSource.setDriverClassName(propDatabaseDriver);
        dataSource.setUrl(propDatabaseUrl);
        dataSource.setUsername(propDatabaseUsername);
        dataSource.setPassword(propDatabasePassword);

        return dataSource;
    }

    /**
     * Bean for entityManager
     * Configure params: datasource, packages to scan, hibernate provider, properties for JPA, JPA vendor adapter
     */
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        LocalContainerEntityManagerFactoryBean entityManagerFactoryBean = new LocalContainerEntityManagerFactoryBean();
        entityManagerFactoryBean.setDataSource(dataSource());
        entityManagerFactoryBean.setPackagesToScan(propEntitymanagerPackagesToScan);
        entityManagerFactoryBean.setPersistenceProviderClass(HibernatePersistenceProvider.class);
        entityManagerFactoryBean.setJpaProperties(getHibernateProperties());
        entityManagerFactoryBean.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

        return entityManagerFactoryBean;
    }

    /**
     * Bean for transaction manager
     */
    @Bean
    public JpaTransactionManager transactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory().getObject());

        return transactionManager;
    }

    /**
     * Method to set hibernate properties/
     * Such as: dialect, show slq. Take properties from "database.properties" file
     */
    private Properties getHibernateProperties() {
        Properties properties = new Properties();
        properties.put("hibernate.dialect", propHibernateDialect);
        properties.put("hibernate.show_sql", propHibernateShowSql);
        properties.put("hibernate.hbm2ddl.auto", propHibernateHbm2DdlAuto);

        return properties;
    }

}
