package by.auction.controller;

import by.auction.entity.Category;
import by.auction.service.CategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;

/**
 * Rest controller. Implement category api to manage categories.
 * Map all /categories requests
 */
@RestController
@RequestMapping(value = "/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private MessageSource messageSource;

    private static final Logger logger = LoggerFactory.getLogger(CategoryController.class);

    /**
     * Map /categories GET requests
     * Find all categories
     * @return - JSON with found categories
     */
    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity findAll() {
        logger.debug(messageSource.getMessage("controller.category.get", null, Locale.getDefault()));
        return ResponseEntity.ok(categoryService.findAll());
    }

    /**
     * Map /categories POST requests
     * Save category
     * If category with specified name is present yet - response with UnprocessableEntity status
     * @param category
     * @return - JSON with saved category
     */
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity save(@RequestBody Category category) {
        logger.info(messageSource.getMessage("controller.category.post.save.category", new Object[]{category}, Locale.getDefault()));
        if (categoryService.findByName(category.getName()).isPresent()) {
            logger.debug(messageSource.getMessage("controller.category.post.save.category.error", new Object[]{category}, Locale.getDefault()));
            return ResponseEntity.unprocessableEntity().build();
        }
        logger.debug(messageSource.getMessage("controller.category.post.save.category.ok", new Object[]{category}, Locale.getDefault()));
        return ResponseEntity.ok(categoryService.save(category));
    }

    /**
     * Map /categories?delete= DELETE requests
     * Delete category by name
     * If category not found - response with NotFound status
     * @param category
     * @return - status Ok
     */
    @RequestMapping(params = "delete", method = RequestMethod.DELETE)
    ResponseEntity delete(@RequestParam("delete") String category) {
        logger.info(messageSource.getMessage("controller.category.delete.category", new Object[]{category}, Locale.getDefault()));
        if (categoryService.findByName(category).isPresent()) {
            categoryService.deleteByName(category);
            logger.debug(messageSource.getMessage("controller.category.delete.category.ok", new Object[]{category}, Locale.getDefault()));
            return ResponseEntity.ok().build();
        }
        logger.debug(messageSource.getMessage("controller.category.error.category.not.found", new Object[]{category}, Locale.getDefault()));
        return ResponseEntity.notFound().build();
    }

}
