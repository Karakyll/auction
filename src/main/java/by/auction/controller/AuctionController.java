package by.auction.controller;

import by.auction.entity.Auction;
import by.auction.entity.Category;
import by.auction.entity.Product;
import by.auction.entity.User;
import by.auction.service.AuctionService;
import by.auction.service.CategoryService;
import by.auction.service.ProductService;
import by.auction.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/auctions")
@CrossOrigin
public class AuctionController {

    @Autowired
    private AuctionService auctionService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity getAllAuctions() {
        return ResponseEntity.ok(auctionService.findAll());
    }

    @RequestMapping(value = "/{auctionId:[\\d]+}", method = RequestMethod.GET)
    ResponseEntity getAuctionById(@PathVariable Long auctionId) {
        if (auctionService.findById(auctionId).isPresent()) {
            return ResponseEntity.ok(auctionService.findById(auctionId).get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(params = "finished", method = RequestMethod.GET)
    ResponseEntity getAllOngoingAuctions(@RequestParam("finished") boolean finished) {
        return ResponseEntity.ok(auctionService.findFinished(finished));
    }

    @RequestMapping(params = "category", method = RequestMethod.GET)
    ResponseEntity getAuctionsByCategory(@RequestParam("category") String category) {
        if (categoryService.findByName(category).isPresent()) {
            return ResponseEntity.ok(auctionService.findByCategoryName(category));
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @RequestMapping(params = "search", method = RequestMethod.GET)
    ResponseEntity getAuctionsWithProductsContain(@RequestParam("search") String search) {
        return ResponseEntity.ok(auctionService.findByProductNameContains(search));
    }

    @RequestMapping(params = "user", method = RequestMethod.GET)
    ResponseEntity getAuctionsByUserName(@RequestParam("user") String userName) {
        if (userService.findByUserName(userName).isPresent()) {
            return ResponseEntity.ok(auctionService.findByUserName(userName));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(params = "endBefore", method = RequestMethod.GET)
    ResponseEntity getAuctionsByEndTime(@RequestParam("endBefore") @DateTimeFormat(pattern="dd.MM.yyyyhh:mm") Date date) {
        return ResponseEntity.ok(auctionService.findByEndTimeLessThan(date));
    }

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity saveAuction(@RequestBody Auction auction) {
        if(!userService.findByUserName(auction.getOwner_name()).isPresent()
                || !categoryService.findByName(auction.getProduct().getCategory_name()).isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        Product newProduct = new Product();

        newProduct.setName(auction.getProduct().getName());
        newProduct.setCategory(new Category(auction.getProduct().getCategory_name()));
        newProduct.setPrice(auction.getProduct().getPrice());
        newProduct.setDescription(auction.getProduct().getDescription());

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

        return ResponseEntity.created(location).body(result);
    }

    @RequestMapping(value = "/{auctionId:[\\d]+}", method = RequestMethod.DELETE)
    ResponseEntity deleteAuction(@PathVariable Long auctionId) {
        if (auctionService.findById(auctionId).isPresent()) {
            auctionService.deleteById(auctionId);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(value = "/{auctionId:[\\d]+}", params = "finish", method = RequestMethod.PUT)
    ResponseEntity finishAuction(@PathVariable Long auctionId, @RequestParam Boolean finish) {
        if (!auctionService.findById(auctionId).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        if (finish) {
            Auction auction = auctionService.findById(auctionId).get();
            auction.setFinished(finish);
            auctionService.save(auction);
        }
        return ResponseEntity.ok(auctionService.findById(auctionId).get());
    }

}
