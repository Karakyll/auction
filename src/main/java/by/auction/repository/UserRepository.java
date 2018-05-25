package by.auction.repository;

import by.auction.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for data management in a table "users"
 */
public interface UserRepository extends JpaRepository<User, String>{

    /**
     * Find User by username
     * @param userName - username
     * @return - Optional of user
     */
    Optional<User> findByUserName(String userName);

    /**
     * Find users by enabled status
     * @param enabled - boolean param, which define user by enabled status
     * @return - List of found users
     */
    List<User> findByEnabled(Boolean enabled);

}
