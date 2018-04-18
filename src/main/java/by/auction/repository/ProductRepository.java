package by.auction.repository;

import by.auction.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for data management in a table "products"
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

    List<Product> findAll();

    Optional<Product> findById(Long id);

}
