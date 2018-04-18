package by.auction.service;

import by.auction.entity.User;

import java.util.List;
import java.util.Optional;

/**
 * Service for data management in a table "users"
 */
public interface UserService {

    List<User> findAll();

    Optional<User> findByUserName(String userName);

    List<User> findByEnabled(Boolean enabled);

    User save(User user);

    void deleteByUserName(String userName);

    void enable(Boolean ban, String userName);

    void promote(String userName);

    void demote(String userName);

}
