package by.auction.service.implementation;

import by.auction.entity.Role;
import by.auction.entity.User;
import by.auction.repository.RoleRepository;
import by.auction.repository.UserRepository;
import by.auction.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.transaction.Transaction;
import java.util.List;
import java.util.Optional;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    @Override
    public List<User> findByEnabled(Boolean enabled) {
        return userRepository.findUsersByEnabled(enabled);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteByUserName(String userName) {
        userRepository.deleteById(userName);
    }

    @Override
    public void enable(Boolean enable, String userName) {
        User user = findByUserName(userName).get();
        if (!roleRepository.findRoleByUserAndRole(user, "ROLE_USER").isPresent()) {
            Role role = new Role("ROLE_USER");
            role.setUser(user);
            roleRepository.save(role);
        }
        user.setEnabled(enable);
        userRepository.save(user);
    }

    @Override
    public void promote(String userName) {
        User user = userRepository.findByUserName(userName).get();
        if (!roleRepository.findRoleByUserAndRole(user, "ROLE_MANAGER").isPresent()) {
            Role role = new Role("ROLE_MANAGER");
            role.setUser(user);
            roleRepository.save(role);
        }
    }

    @Override
    public void demote(String userName) {
        User user = userRepository.findByUserName(userName).get();
        if (roleRepository.findRoleByUserAndRole(user, "ROLE_MANAGER").isPresent()) {
            roleRepository.deleteRoleByUserAndRole(user, "ROLE_MANAGER");
        }
    }
}
