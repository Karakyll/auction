package by.auction.service.implementation;

import by.auction.entity.Product;
import by.auction.repository.ProductRepository;
import by.auction.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

/**
 * Implementation for interface ProductService
 */
@Service("productService")
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MessageSource messageSource;

    private static final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    /**
     * Find all products
     * @return list of found products
     */
    @Override
    public List<Product> findAll() {
        logger.debug(messageSource.getMessage("service.product.find.all", null, Locale.getDefault()));
        return productRepository.findAll();
    }

    /**
     * Find product by ID
     * @param id
     * @return Optional of found product
     */
    @Override
    public Optional<Product> findById(Long id) {
        logger.debug(messageSource.getMessage("service.product.find.by.id", new Object[]{id}, Locale.getDefault()));
        return productRepository.findById(id);
    }

    /**
     * Save product in DB
     * @param product
     * @return saved product
     */
    @Override
    public Product save(Product product) {
        logger.debug(messageSource.getMessage("service.product.save", new Object[]{product.getName()}, Locale.getDefault()));
        return productRepository.save(product);
    }

    /**
     * Delete product by ID
     * @param id
     */
    @Override
    public void deleteById(Long id) {
        logger.debug(messageSource.getMessage("service.product.delete.by.id", new Object[]{id}, Locale.getDefault()));
        productRepository.deleteById(id);
    }
}
