package by.auction.controller;

import by.auction.entity.Category;
import by.auction.service.CategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping(value = "/categories")
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private MessageSource messageSource;

    private static final Logger logger = LoggerFactory.getLogger(CategoryController.class);

    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity getAllCategory() {
        logger.info(messageSource.getMessage("controller.category.get", null, Locale.getDefault()));
        return ResponseEntity.ok(categoryService.findAll());
    }

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity saveCategory(@RequestBody Category category) {
        logger.info(messageSource.getMessage("controller.category.post.save.category", new Object[]{category}, Locale.getDefault()));
        if (categoryService.findByName(category.getName()).isPresent()) {
            logger.info(messageSource.getMessage("controller.category.post.save.category.error", new Object[]{category}, Locale.getDefault()));
            return ResponseEntity.unprocessableEntity().build();
        } else {
            logger.info(messageSource.getMessage("controller.category.post.save.category.ok", new Object[]{category}, Locale.getDefault()));
            return ResponseEntity.ok(categoryService.save(category));
        }
    }

    @RequestMapping(params = "delete", method = RequestMethod.DELETE)
    ResponseEntity deleteCategory(@RequestParam("delete") String category) {
        logger.info(messageSource.getMessage("controller.category.delete.category", new Object[]{category}, Locale.getDefault()));
        if (categoryService.findByName(category).isPresent()) {
            categoryService.deleteByName(category);
            logger.info(messageSource.getMessage("controller.category.delete.category.ok", new Object[]{category}, Locale.getDefault()));
            return ResponseEntity.ok().build();
        } else {
            logger.info(messageSource.getMessage("controller.category.error.category.not.found", new Object[]{category}, Locale.getDefault()));
            return ResponseEntity.notFound().build();
        }
    }

}
