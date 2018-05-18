package by.auction.repository;

import by.auction.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for data management in a table "users"
 */
public interface UserRepository extends JpaRepository<User, String>{

    Optional<User> findByUserName(String userName);

    List<User> findByEnabled(Boolean enabled);

}
