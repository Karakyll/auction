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

@Service("productService")
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MessageSource messageSource;

    private static final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    @Override
    public List<Product> findAll() {
        logger.info(messageSource.getMessage("service.product.find.all", null, Locale.getDefault()));
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        logger.info(messageSource.getMessage("service.product.find.by.id", new Object[]{id}, Locale.getDefault()));
        return productRepository.findById(id);
    }

    @Override
    public Product save(Product product) {
        logger.info(messageSource.getMessage("service.product.save", new Object[]{product}, Locale.getDefault()));
        return productRepository.save(product);
    }

    @Override
    public void deleteById(Long id) {
        logger.info(messageSource.getMessage("service.product.delete.by.id", new Object[]{id}, Locale.getDefault()));
        productRepository.deleteById(id);
    }
}
