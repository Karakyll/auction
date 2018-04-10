package by.auction.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 * Configuration class. Union all configuration classes.
 * Configure Localisation
 */
@Configuration
@EnableWebMvc
@Import({DataConfig.class,  WebConfig.class})
public class AppConfig {

}