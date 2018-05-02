package by.auction.service.implementation;

import by.auction.entity.Role;
import by.auction.entity.User;
import by.auction.repository.RoleRepository;
import by.auction.repository.UserRepository;
import by.auction.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

/**
 * Implementation for interface UserService
 */
@Service("userService")
@Transactional
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private MessageSource messageSource;

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    /**
     * Find all users
     * @return list of found users
     */
    @Override
    public List<User> findAll() {
        logger.debug(messageSource.getMessage("service.user.find.all", null, Locale.getDefault()));
        return userRepository.findAll();
    }

    /**
     * Find user by username
     * @param userName
     * @return Optional of found user
     */
    @Override
    public Optional<User> findByUserName(String userName) {
        logger.debug(messageSource.getMessage("service.user.find.by.user.name", new Object[]{userName}, Locale.getDefault()));
        return userRepository.findByUserName(userName);
    }

    /**
     * Find all enabled or not users
     * @param enabled - boolean
     * @return list of found users
     */
    @Override
    public List<User> findByEnabled(Boolean enabled) {
        logger.debug(messageSource.getMessage("service.user.find.by.enabled", new Object[]{enabled}, Locale.getDefault()));
        return userRepository.findUsersByEnabled(enabled);
    }

    /**
     * Save user in DB
     * @param user
     * @return saved user
     */
    @Override
    public User save(User user) {
        logger.debug(messageSource.getMessage("service.user.save", new Object[]{user.getUserName()}, Locale.getDefault()));
        return userRepository.save(user);
    }

    /**
     * Delete user by username
     * @param userName
     */
    @Override
    public void deleteByUserName(String userName) {
        logger.debug(messageSource.getMessage("service.user.delete.by.user.name", new Object[]{userName}, Locale.getDefault()));
        userRepository.deleteById(userName);
    }

    /**
     * Enable user
     * @param enable - boolean.
     * @param userName
     */
    @Override
    public void enable(Boolean enable, String userName) {
        logger.debug(messageSource.getMessage("service.user.enable.user", new Object[]{enable, userName}, Locale.getDefault()));
        User user = findByUserName(userName).get();
        if (!roleRepository.findRoleByUserAndRole(user, "ROLE_USER").isPresent()) {
            Role role = new Role("ROLE_USER");
            logger.debug(messageSource.getMessage("service.user.save.role", new Object[]{userName, role}, Locale.getDefault()));
            role.setUser(user);
            roleRepository.save(role);
        }
        user.setEnabled(enable);
        logger.debug(messageSource.getMessage("service.user.save", new Object[]{user}, Locale.getDefault()));
        userRepository.save(user);
    }

    /**
     * Promote user to MANAGER
     * @param userName
     */
    @Override
    public void promote(String userName) {
        logger.debug(messageSource.getMessage("service.user.promote", new Object[]{userName}, Locale.getDefault()));
        User user = userRepository.findByUserName(userName).get();
        if (!roleRepository.findRoleByUserAndRole(user, "ROLE_MANAGER").isPresent()) {
            Role role = new Role("ROLE_MANAGER");
            logger.debug(messageSource.getMessage("service.user.save.role", new Object[]{userName, role}, Locale.getDefault()));
            role.setUser(user);
            roleRepository.save(role);
        }
    }

    /**
     * Demote user to USER
     * @param userName
     */
    @Override
    public void demote(String userName) {
        logger.debug(messageSource.getMessage("service.user.demote", new Object[]{userName}, Locale.getDefault()));
        User user = userRepository.findByUserName(userName).get();
        if (roleRepository.findRoleByUserAndRole(user, "ROLE_MANAGER").isPresent()) {
            logger.debug(messageSource.getMessage("service.user.delete.role", new Object[]{userName, "ROLE_MANAGER"}, Locale.getDefault()));
            roleRepository.deleteRoleByUserAndRole(user, "ROLE_MANAGER");
        }
    }
}
