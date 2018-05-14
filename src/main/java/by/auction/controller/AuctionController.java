package by.auction.controller;

import by.auction.entity.Auction;
import by.auction.entity.Category;
import by.auction.entity.Product;
import by.auction.service.AuctionService;
import by.auction.service.CategoryService;
import by.auction.service.ProductService;
import by.auction.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Date;
import java.util.Locale;

/**
 * Rest controller. Implement auction api to manage auctions.
 * Map all /auctions requests
 */
@RestController
@RequestMapping(value = "/api/auctions")
public class AuctionController {

    @Autowired
    private AuctionService auctionService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Autowired
    private MessageSource messageSource;

    private static final Logger logger = LoggerFactory.getLogger(AuctionController.class);

    /**
     * Map /auctions GET requests
     * Find all auctions
     * @return - JSON with all auctions
     */
    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity findAll() {
        logger.debug(messageSource.getMessage("controller.auction.get", null, Locale.getDefault()));
        return ResponseEntity.ok(auctionService.findAll());
    }

    /**
     * Map /auctions/id GET requests
     * Find auction by id
     * If auction not found - response with NotFound status
     * @param auctionId
     * @return - JSON with found auction
     */
    @RequestMapping(value = "/{auctionId:[\\d]+}", method = RequestMethod.GET)
    ResponseEntity findById(@PathVariable Long auctionId) {
        logger.debug(messageSource.getMessage("controller.auction.get.id", new Object[]{auctionId}, Locale.getDefault()));
        if (auctionService.findById(auctionId).isPresent()) {
            logger.debug(messageSource.getMessage("controller.auction.get.id.ok", new Object[]{auctionId}, Locale.getDefault()));
            return ResponseEntity.ok(auctionService.findById(auctionId).get());
        } else {
            logger.debug(messageSource.getMessage("controller.auction.error.auction.not.found", new Object[]{auctionId}, Locale.getDefault()));
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Map /auctions?finished= GET requests
     * Find finished or not auctions
     * @param finished - true or false
     * @return - JSON with found auctions
     */
    @RequestMapping(params = "finished", method = RequestMethod.GET)
    ResponseEntity findOngoing(@RequestParam("finished") boolean finished) {
        logger.debug(messageSource.getMessage("controller.auction.get.finished", new Object[]{finished}, Locale.getDefault()));
        return ResponseEntity.ok(auctionService.findFinished(finished));
    }

    /**
     * Map /auctions?category= GET requests
     * Find auctions by category
     * If category not found - response with NotFound status
     * @param category
     * @return - JSON with found auctions
     */
    @RequestMapping(params = "category", method = RequestMethod.GET)
    ResponseEntity findByCategory(@RequestParam("category") String category) {
        logger.debug(messageSource.getMessage("controller.auction.get.category", new Object[]{category}, Locale.getDefault()));
        if (categoryService.findByName(category).isPresent()) {
            logger.debug(messageSource.getMessage("controller.auction.get.category.ok", new Object[]{category}, Locale.getDefault()));
            return ResponseEntity.ok(auctionService.findByCategoryName(category));
        } else {
            logger.debug(messageSource.getMessage("controller.auction.get.category.error", new Object[]{category}, Locale.getDefault()));
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Map /auctions?search= GET requests
     * Find auctions with searchTag in product name
     * Search tag case-sensitive and found only whole word
     * @param search
     * @return - JSON with found auctions
     */
    @RequestMapping(params = "search", method = RequestMethod.GET)
    ResponseEntity findByProductNameContain(@RequestParam("search") String search) {
        logger.debug(messageSource.getMessage("controller.auction.get.search", new Object[]{search}, Locale.getDefault()));
        return ResponseEntity.ok(auctionService.findByProductNameContains(search));
    }

    /**
     * Map /auctions?user= GET requests
     * Find auctions by username
     * If user not found - response with NotFound status
     * @param userName
     * @return - JSON with found auctions
     */
    @RequestMapping(params = "user", method = RequestMethod.GET)
    ResponseEntity findByUserName(@RequestParam("user") String userName) {
        logger.debug(messageSource.getMessage("controller.auction.get.by.username", new Object[]{userName}, Locale.getDefault()));
        if (userService.findByUserName(userName).isPresent()) {
            logger.debug(messageSource.getMessage("controller.auction.get.by.username.ok", new Object[]{userName}, Locale.getDefault()));
            return ResponseEntity.ok(auctionService.findByUserName(userName));
        } else {
            logger.debug(messageSource.getMessage("controller.auction.get.by.username.error", new Object[]{userName}, Locale.getDefault()));
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Map /auctions?endBefore= GET requests
     * Find auctions what end before input date
     * @param date
     * @return - JSON with found auctions
     */
    @RequestMapping(params = "endBefore", method = RequestMethod.GET)
    ResponseEntity findByEndTime(@RequestParam("endBefore") @DateTimeFormat(pattern="dd.MM.yyyyhh:mm") Date date) {
        logger.debug(messageSource.getMessage("controller.auction.get.by.date", new Object[]{date}, Locale.getDefault()));
        return ResponseEntity.ok(auctionService.findByEndTimeLessThan(date));
    }

    /**
     * Map /auctions POST requests
     * Save auction and product
     * If user or category specified in body not found - response with UnprocessableEntity status
     * @param auction - requested body with auction JSON
     * @return - link to created auction with JSON in body.
     */
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity save(@RequestBody Auction auction) {
        logger.debug(messageSource.getMessage("controller.auction.post.save.auction",
                new Object[]{auction.getProduct().getName()}, Locale.getDefault()));
        if(!userService.findByUserName(auction.getOwner_name()).isPresent()
                || !categoryService.findByName(auction.getProduct().getCategory_name()).isPresent()) {
            logger.debug(messageSource.getMessage("controller.auction.post.save.auction.error",
                    new Object[]{auction.getProduct().getName()}, Locale.getDefault()));
            return ResponseEntity.unprocessableEntity().build();
        }

        Product newProduct = new Product();

        newProduct.setName(auction.getProduct().getName());
        newProduct.setCategory(new Category(auction.getProduct().getCategory_name()));
        newProduct.setPrice(auction.getProduct().getPrice());
        newProduct.setDescription(auction.getProduct().getDescription());

        logger.debug(messageSource.getMessage("controller.auction.post.save.product", new Object[]{newProduct.getName()}, Locale.getDefault()));
        newProduct = productService.save(newProduct);

        Auction result = new Auction();

        result.setOwner(userService.findByUserName(auction.getOwner_name()).get());
        result.setProduct(newProduct);
        result.setCreateTime(auction.getCreateTime());
        result.setEndTime(auction.getEndTime());
        result.setDescription(auction.getDescription());
        result.setFinished(auction.getFinished());

        result = auctionService.save(result);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{auctionId}")
                .buildAndExpand(result.getId()).toUri();

        logger.debug(messageSource.getMessage("controller.auction.post.save.ok",
                new Object[]{result.getId(), result.getProduct().getName()}, Locale.getDefault()));
        return ResponseEntity.created(location).body(result);
    }

    /**
     * Map /auctions/id DELETE requests
     * Delete auction by id
     * If auction not found - response with NotFound status
     * @param auctionId
     * @return - status Ok
     */
    @RequestMapping(value = "/{auctionId:[\\d]+}", method = RequestMethod.DELETE)
    ResponseEntity delete(@PathVariable Long auctionId) {
        logger.debug(messageSource.getMessage("controller.auction.delete.auction", new Object[]{auctionId}, Locale.getDefault()));
        if (auctionService.findById(auctionId).isPresent()) {
            auctionService.deleteById(auctionId);
            logger.debug(messageSource.getMessage("controller.auction.delete.auction.ok", new Object[]{auctionId}, Locale.getDefault()));
            return ResponseEntity.ok().build();
        } else {
            logger.debug(messageSource.getMessage("controller.auction.error.auction.not.found", new Object[]{auctionId}, Locale.getDefault()));
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Map /auctions/id?finish= PUT requests
     * Change auction state to finished
     * If auction not found - response with NotFound status
     * @param auctionId
     * @param finish
     * @return - JSON with changed auction
     */
    @RequestMapping(value = "/{auctionId:[\\d]+}", params = "finish", method = RequestMethod.PUT)
    ResponseEntity finish(@PathVariable Long auctionId, @RequestParam Boolean finish) {
        logger.debug(messageSource.getMessage("controller.auction.put.finish.auction", new Object[]{finish, auctionId}, Locale.getDefault()));
        if (!auctionService.findById(auctionId).isPresent()) {
            logger.debug(messageSource.getMessage("controller.auction.error.auction.not.found", new Object[]{auctionId}, Locale.getDefault()));
            return ResponseEntity.notFound().build();
        }
        if (finish) {
            Auction auction = auctionService.findById(auctionId).get();
            auction.setFinished(finish);
            logger.debug(messageSource.getMessage("controller.auction.put.finish.auction.save", new Object[]{auctionId}, Locale.getDefault()));
            auctionService.save(auction);
        }
        logger.debug(messageSource.getMessage("controller.auction.put.finish.auction.ok", new Object[]{finish, auctionId}, Locale.getDefault()));
        return ResponseEntity.ok(auctionService.findById(auctionId).get());
    }

}
