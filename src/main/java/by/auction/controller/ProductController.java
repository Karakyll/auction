package by.auction.controller;

import by.auction.entity.Category;
import by.auction.entity.Product;
import by.auction.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/products")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    @RequestMapping(value = "/{productId:[\\d]+}", method = RequestMethod.GET)
    ResponseEntity getProductById(@PathVariable Long productId) {
        if ((productService.findById(productId)).isPresent()) {
            return ResponseEntity.ok(productService.findById(productId).get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity saveProduct(@RequestBody Product product) {
        Product result = new Product();

        result.setName(product.getName());
        result.setCategory(new Category(product.getCategory_name()));
        result.setPrice(product.getPrice());
        result.setDescription(product.getDescription());

        result = productService.save(result);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{productId}")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location).body(result);
    }

    @RequestMapping(value = "/{productId:[\\d]+}", method = RequestMethod.DELETE)
    ResponseEntity deleteProduct(@PathVariable Long productId) {
        if (productService.findById(productId).isPresent()) {
            productService.deleteById(productId);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
