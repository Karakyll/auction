package by.auction.service;

import by.auction.entity.Product;

import java.util.List;
import java.util.Optional;

/**
 * Service for data management in a table "products"
 */
public interface ProductService {

    /**
     * Find all products
     * @return list of found products
     */
    List<Product> findAll();

    /**
     * Find product by ID
     * @param id
     * @return Optional of found product
     */
    Optional<Product> findById(Long id);

    /**
     * Save product in DB
     * @param product
     * @return saved product
     */
    Product save(final Product product);

    /**
     * Delete product by ID
     * @param id
     */
    void deleteById(Long id);

}
