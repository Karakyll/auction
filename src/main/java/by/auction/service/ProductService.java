package by.auction.service;

import by.auction.entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    List<Product> findAll();

    Optional<Product> findById(Long id);

    Product save(final Product product);

    void deleteById(Long id);

}
