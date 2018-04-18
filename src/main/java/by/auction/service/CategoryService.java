package by.auction.service;

import by.auction.entity.Category;

import java.util.List;
import java.util.Optional;

/**
 * Service for data management in a table "categories"
 */
public interface CategoryService {

    List<Category> findAll();

    Optional<Category> findByName(String name);

    Category save(final Category category);

    void deleteByName(String name);

}
