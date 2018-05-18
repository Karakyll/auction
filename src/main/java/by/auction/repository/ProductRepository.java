package by.auction.repository;

import by.auction.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for data management in a table "products"
 */
public interface ProductRepository extends JpaRepository<Product, Long>{

}
