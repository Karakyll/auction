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
 * Implementing the UserService interface
 */
@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private MessageSource messageSource;

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public List<User> findAll() {
        logger.debug(messageSource.getMessage("service.user.find.all", null, Locale.getDefault()));
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findByUserName(String userName) {
        logger.debug(messageSource.getMessage("service.user.find.by.user.name", new Object[]{userName}, Locale.getDefault()));
        return userRepository.findByUserName(userName);
    }

    @Override
    public List<User> findByEnabled(Boolean enabled) {
        logger.debug(messageSource.getMessage("service.user.find.by.enabled", new Object[]{enabled}, Locale.getDefault()));
        return userRepository.findByEnabled(enabled);
    }

    @Override
    public User save(User user) {
        logger.debug(messageSource.getMessage("service.user.save", new Object[]{user.getUserName()}, Locale.getDefault()));
        return userRepository.save(user);
    }

    @Override
    public void deleteByUserName(String userName) {
        logger.debug(messageSource.getMessage("service.user.delete.by.user.name", new Object[]{userName}, Locale.getDefault()));
        userRepository.deleteById(userName);
    }

    @Override
    public void enable(Boolean enable, String userName) {
        logger.debug(messageSource.getMessage("service.user.enable.user", new Object[]{enable, userName}, Locale.getDefault()));
        User user = findByUserName(userName).get();
        if (!roleRepository.findByUserAndRole(user, "ROLE_USER").isPresent()) {
            Role role = new Role("ROLE_USER");
            logger.debug(messageSource.getMessage("service.user.save.role", new Object[]{userName, role}, Locale.getDefault()));
            role.setUser(user);
            roleRepository.save(role);
        }
        user.setEnabled(enable);
        logger.debug(messageSource.getMessage("service.user.save", new Object[]{user}, Locale.getDefault()));
        userRepository.save(user);
    }

    @Override
    public void promote(String userName) {
        logger.debug(messageSource.getMessage("service.user.promote", new Object[]{userName}, Locale.getDefault()));
        User user = userRepository.findByUserName(userName).get();
        if (!roleRepository.findByUserAndRole(user, "ROLE_MANAGER").isPresent()) {
            Role role = new Role("ROLE_MANAGER");
            logger.debug(messageSource.getMessage("service.user.save.role", new Object[]{userName, role}, Locale.getDefault()));
            role.setUser(user);
            roleRepository.save(role);
        }
    }

    @Override
    public void demote(String userName) {
        logger.debug(messageSource.getMessage("service.user.demote", new Object[]{userName}, Locale.getDefault()));
        User user = userRepository.findByUserName(userName).get();
        if (roleRepository.findByUserAndRole(user, "ROLE_MANAGER").isPresent()) {
            logger.debug(messageSource.getMessage("service.user.delete.role", new Object[]{userName, "ROLE_MANAGER"}, Locale.getDefault()));
            roleRepository.deleteByUserAndRole(user, "ROLE_MANAGER");
        }
    }
}
