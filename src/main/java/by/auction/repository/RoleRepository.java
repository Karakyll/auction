package by.auction.repository;

import by.auction.entity.Role;
import by.auction.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repository for data management in a table "user_roles"
 */
public interface RoleRepository extends JpaRepository<Role, Long>{

    /**
     * Find role by user and role
     * @param user - User
     * @param role - string of role name
     * @return - Optional of found Role
     */
    Optional<Role> findByUserAndRole(User user, String role);

    /**
     * Delete role by User and role
     * @param user - User
     * @param role - string of role name
     */
    void deleteByUserAndRole(User user, String role);

}
