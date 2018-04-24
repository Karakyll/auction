package by.auction.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;
import org.springframework.security.oauth2.provider.token.TokenStore;

/**
 * Configuration classes for OAuth2 server
 */
@Configuration
public class OAuth2ServerConfig {

    private static final String RESOURCE_ID = "auction_rest_api";

    /**
     * Configuration resource server
     */
    @Configuration
    @EnableResourceServer
    protected static class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {

        @Override
        public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
            resources.resourceId(RESOURCE_ID).stateless(false);
        }

        /**
         * HttpSecurity configuration
         */
        @Override
        public void configure(HttpSecurity http) throws Exception {
            http.anonymous().disable()
                    .authorizeRequests()
                    .antMatchers("/login/**").hasAuthority("ADMIN")
                    .and().exceptionHandling().accessDeniedHandler(new OAuth2AccessDeniedHandler());
        }
    }

    /**
     * Configuration authorization server
     */
    @Configuration
    @EnableAuthorizationServer
    protected static class AuthorizationServerConfiguration extends AuthorizationServerConfigurerAdapter {

        @Autowired
        private  TokenStore tokenStore;

        @Autowired
        private AuthenticationManager authenticationManager;

        @Autowired
        private UserDetailsService userDetailsService;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Override
        public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
            security.tokenKeyAccess("permitAll()").checkTokenAccess("isAuthenticated()")
                    .allowFormAuthenticationForClients()
                    .passwordEncoder(passwordEncoder);
        }

        /**
         * Configuration for OAuth2 clients
         */
        @Override
        public void configure(ClientDetailsServiceConfigurer clients) throws Exception {

            clients.inMemory()
                    .withClient("my-trusted-client")
                    .authorizedGrantTypes("password", "authorization_code", "refresh_token", "client_credentials")
                    .scopes("read","write","edit")
                    .secret("secret")
                    .accessTokenValiditySeconds(120)
                    .and()
                    .withClient("auctionClientIdImplicid")
                    .authorizedGrantTypes("implicit")
                    .scopes("read", "write", "foo", "bar")
                    .autoApprove(false)
                    .accessTokenValiditySeconds(3600)
                    .and()
                    .withClient("auctionClientIdPassword")
                    .secret("secret")
                    .authorizedGrantTypes("password", "authorization_code", "refresh_token")
                    .scopes("read","write","edit")
                    .accessTokenValiditySeconds(3600) // 1 hour
                    .refreshTokenValiditySeconds(2592000) // 30 days
                    .and()
                    .withClient("clientcred")
                    .secret("123456")
                    .authorizedGrantTypes("client_credentials")
                    .scopes("trust")
                    .resourceIds(RESOURCE_ID)
                    .and()
                    .withClient("clientauthcode")
                    .secret("123456")
                    .authorizedGrantTypes("authorization_code", "refresh_token")
                    .scopes("read", "write")
                    .resourceIds(RESOURCE_ID);
        }

        @Override
        public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
            endpoints.tokenStore(tokenStore).authenticationManager(authenticationManager).userDetailsService(userDetailsService);
        }
    }


}
