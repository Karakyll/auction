package by.auction.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@PropertySource("classpath:properties/database.properties")
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

}
