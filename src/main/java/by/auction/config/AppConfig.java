package by.auction.config;

import by.auction.security.OAuth2SecurityConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 * Configuration class. Union all configuration classes.
 */
@Configuration
@EnableWebMvc
@Import({DataConfig.class,  WebConfig.class, OAuth2SecurityConfiguration.class})
public class AppConfig {

}
