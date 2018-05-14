package by.auction.repository;

import by.auction.entity.Role;
import by.auction.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repository for data management in a table "user_roles"
 */
public interface RoleRepository extends JpaRepository<Role, Long>{

    Optional<Role> findByUserAndRole(User user, String role);

    void deleteByUserAndRole(User user, String role);

}
