package by.auction.service;

import by.auction.entity.User;

import java.util.List;
import java.util.Optional;

/**
 * Service for data management in a table "users"
 */
public interface UserService {

    /**
     * Find all users
     * @return list of found users
     */
    List<User> findAll();

    /**
     * Find user by username
     * @param userName
     * @return Optional of found user
     */
    Optional<User> findByUserName(String userName);

    /**
     * Find all enabled or not users
     * @param enabled - boolean
     * @return list of found users
     */
    List<User> findByEnabled(Boolean enabled);

    /**
     * Save user in DB
     * @param user
     * @return saved user
     */
    User save(User user);

    /**
     * Delete user by username
     * @param userName
     */
    void deleteByUserName(String userName);

    /**
     * Enable user
     * @param enable - boolean.
     * @param userName
     */
    void enable(Boolean enable, String userName);

    /**
     * Promote user to MANAGER
     * @param userName
     */
    void promote(String userName);

    /**
     * Demote user to USER
     * @param userName
     */
    void demote(String userName);

}
