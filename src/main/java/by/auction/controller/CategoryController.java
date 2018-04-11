package by.auction.controller;

import by.auction.entity.Category;
import by.auction.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/categories")
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity getAllCategory() {
        return ResponseEntity.ok(categoryService.findAll());
    }

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity saveCategory(@RequestBody Category category) {
        if (categoryService.findByName(category.getName()).isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        } else {
            return ResponseEntity.ok(categoryService.save(category));
        }
    }

    @RequestMapping(params = "delete", method = RequestMethod.DELETE)
    ResponseEntity deleteCategory(@RequestParam("delete") String category) {
        if (categoryService.findByName(category).isPresent()) {
            categoryService.deleteByName(category);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
