package by.auction.repository;

import by.auction.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repository for data management in a table "categories"
 */
public interface CategoryRepository extends JpaRepository<Category, String>{

    Optional<Category> findByName(String name);

}
