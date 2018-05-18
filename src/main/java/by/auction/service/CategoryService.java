package by.auction.service;

import by.auction.entity.Category;

import java.util.List;
import java.util.Optional;

/**
 * Service for data management in a table "categories"
 */
public interface CategoryService {

    /**
     * Find all categories
     * @return list of found categories
     */
    List<Category> findAll();

    /**
     * Find category by name
     * @param name
     * @return Optional of found category
     */
    Optional<Category> findByName(String name);

    /**
     * Save category in DB
     * @param category
     * @return saved category
     */
    Category save(final Category category);

    /**
     * Delete category by ID
     * @param name
     */
    void deleteByName(String name);

}
