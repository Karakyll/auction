package by.auction.repository;

import by.auction.entity.Role;
import by.auction.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for data management in a table "user_roles"
 */
public interface RoleRepository extends JpaRepository<Role, Long>{

    List<Role> findAll();

    Optional<Role> findById(Long id);

    Optional<Role> findRoleByUserAndRole(User user, String role);

    void deleteRoleByUserAndRole(User user, String role);

}
