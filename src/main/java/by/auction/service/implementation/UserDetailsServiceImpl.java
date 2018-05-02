package by.auction.service.implementation;

import by.auction.entity.Role;
import by.auction.entity.User;
import by.auction.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

/**
 * Service for finding users and roles in database.
 * Need for Spring security configuration
 */
@Service("userDetailsService")
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private MessageSource messageSource;

    private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    /**
     * Load user. Grant with roles, found in DB.
     * @param userName
     * @return user object for spring security
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        logger.debug(messageSource.getMessage("service.user.details.load.user.with.username", new Object[]{userName}, Locale.getDefault()));
        if (!userRepository.findByUserName(userName).isPresent()) {
            logger.debug(messageSource.getMessage("service.user.details.error.user.not.found", new Object[]{userName}, Locale.getDefault()));
            throw new UsernameNotFoundException(userName);
        }

        User user = userRepository.findByUserName(userName).get();

        if (!user.getEnabled()) {
            logger.debug(messageSource.getMessage("service.user.details.error.user.not.enabled", new Object[]{userName}, Locale.getDefault()));
            throw new UsernameNotFoundException("User disabled.");
        }

        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();

        for (Role role : user.getRoles()) {
            logger.debug(messageSource.getMessage("service.user.details.grant.user.with.role", new Object[]{userName, role.getRole()}, Locale.getDefault()));
            grantedAuthorities.add(new SimpleGrantedAuthority(role.getRole()));
        }
        logger.debug(messageSource.getMessage("service.user.details.loaded.user.with.username", new Object[]{userName}, Locale.getDefault()));
        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), grantedAuthorities);
    }

}
