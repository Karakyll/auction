package by.auction.service;

import by.auction.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> findAll();

    Optional<User> findByUserName(String userName);

    List<User> findByEnabled(Boolean enabled);

    User save(User user);

    void deleteByUserName(String userName);

    User ban(String userName);

}
