package by.auction.service.implementations;

import by.auction.entity.User;
import by.auction.repository.UserRepository;
import by.auction.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

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
    public User ban(String userName) throws UsernameNotFoundException{

        if (findByUserName(userName).isPresent()){
            throw new UsernameNotFoundException(userName);
        }

        User user = findByUserName(userName).get();
        user.setEnabled(false);

        return userRepository.save(user);
    }
}
