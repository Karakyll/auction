package by.auction.service.implementation;

import by.auction.entity.Category;
import by.auction.repository.CategoryRepository;
import by.auction.service.CategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service("categoryService")
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private MessageSource messageSource;

    private static final Logger logger = LoggerFactory.getLogger(CategoryServiceImpl.class);

    @Override
    public List<Category> findAll() {
        logger.info(messageSource.getMessage("service.category.find.all", null, Locale.getDefault()));
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> findByName(String name) {
        logger.info(messageSource.getMessage("service.category.find.by.name", new Object[]{name}, Locale.getDefault()));
        return categoryRepository.findByName(name);
    }

    @Override
    public Category save(Category category) {
        logger.info(messageSource.getMessage("service.category.save", new Object[]{category}, Locale.getDefault()));
        return categoryRepository.save(category);
    }

    @Override
    public void deleteByName(String name) {
        logger.info(messageSource.getMessage("service.category.delete.by.name", new Object[]{name}, Locale.getDefault()));
        categoryRepository.deleteById(name);
    }
}
