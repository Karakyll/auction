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

import javax.transaction.Transaction;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

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

    @Override
    public List<User> findAll() {
        logger.info(messageSource.getMessage("service.user.find.all", null, Locale.getDefault()));
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findByUserName(String userName) {
        logger.info(messageSource.getMessage("service.user.find.by.user.name", new Object[]{userName}, Locale.getDefault()));
        return userRepository.findByUserName(userName);
    }

    @Override
    public List<User> findByEnabled(Boolean enabled) {
        logger.info(messageSource.getMessage("service.user.find.by.enabled", new Object[]{enabled}, Locale.getDefault()));
        return userRepository.findUsersByEnabled(enabled);
    }

    @Override
    public User save(User user) {
        logger.info(messageSource.getMessage("service.user.save", new Object[]{user}, Locale.getDefault()));
        return userRepository.save(user);
    }

    @Override
    public void deleteByUserName(String userName) {
        logger.info(messageSource.getMessage("service.user.delete.by.user.name", new Object[]{userName}, Locale.getDefault()));
        userRepository.deleteById(userName);
    }

    @Override
    public void enable(Boolean enable, String userName) {
        logger.info(messageSource.getMessage("service.user.enable.user", new Object[]{enable, userName}, Locale.getDefault()));
        User user = findByUserName(userName).get();
        if (!roleRepository.findRoleByUserAndRole(user, "ROLE_USER").isPresent()) {
            Role role = new Role("ROLE_USER");
            logger.info(messageSource.getMessage("service.user.save.role", new Object[]{userName, role}, Locale.getDefault()));
            role.setUser(user);
            roleRepository.save(role);
        }
        user.setEnabled(enable);
        logger.info(messageSource.getMessage("service.user.save", new Object[]{user}, Locale.getDefault()));
        userRepository.save(user);
    }

    @Override
    public void promote(String userName) {
        logger.info(messageSource.getMessage("service.user.promote", new Object[]{userName}, Locale.getDefault()));
        User user = userRepository.findByUserName(userName).get();
        if (!roleRepository.findRoleByUserAndRole(user, "ROLE_MANAGER").isPresent()) {
            Role role = new Role("ROLE_MANAGER");
            logger.info(messageSource.getMessage("service.user.save.role", new Object[]{userName, role}, Locale.getDefault()));
            role.setUser(user);
            roleRepository.save(role);
        }
    }

    @Override
    public void demote(String userName) {
        logger.info(messageSource.getMessage("service.user.demote", new Object[]{userName}, Locale.getDefault()));
        User user = userRepository.findByUserName(userName).get();
        if (roleRepository.findRoleByUserAndRole(user, "ROLE_MANAGER").isPresent()) {
            logger.info(messageSource.getMessage("service.user.delete.role", new Object[]{userName, "ROLE_MANAGER"}, Locale.getDefault()));
            roleRepository.deleteRoleByUserAndRole(user, "ROLE_MANAGER");
        }
    }
}
