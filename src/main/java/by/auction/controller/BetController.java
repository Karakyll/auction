package by.auction.controller;

import by.auction.entity.Bet;
import by.auction.service.AuctionService;
import by.auction.service.BetService;
import by.auction.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping(value = "/bets")
@CrossOrigin
public class BetController {

    @Autowired
    private BetService betService;

    @Autowired
    private AuctionService auctionService;

    @Autowired
    private UserService userService;

    @Autowired
    private MessageSource messageSource;

    private static final Logger logger = LoggerFactory.getLogger(BetController.class);

    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity getAllBets() {
        logger.info(messageSource.getMessage("controller.bet.get", null, Locale.getDefault()));
        return ResponseEntity.ok(betService.findAll());
    }

    @RequestMapping(params = "id", method = RequestMethod.GET)
    ResponseEntity getBetById(@RequestParam("id") Long id) {
        logger.info(messageSource.getMessage("controller.bet.get.by.id", new Object[]{id}, Locale.getDefault()));
        if (betService.findById(id).isPresent()) {
            logger.info(messageSource.getMessage("controller.bet.get.by.id.ok", new Object[]{id}, Locale.getDefault()));
            return ResponseEntity.ok(betService.findById(id).get());
        } else {
            logger.info(messageSource.getMessage("controller.bet.error.bet.not.found", new Object[]{id}, Locale.getDefault()));
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(params = "auctionId", method = RequestMethod.GET)
    ResponseEntity getBetsByAuctionId(@RequestParam("auctionId") Long auctionId) {
        logger.info(messageSource.getMessage("controller.bet.get.by.auction.id", new Object[]{auctionId}, Locale.getDefault()));
        if (auctionService.findById(auctionId).isPresent()) {
            logger.info(messageSource.getMessage("controller.bet.get.by.auction.id.ok", new Object[]{auctionId}, Locale.getDefault()));
            return ResponseEntity.ok(betService.findByAuctionId(auctionId));
        } else {
            logger.info(messageSource.getMessage("controller.bet.get.by.auction.id.error", new Object[]{auctionId}, Locale.getDefault()));
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(params = "username", method = RequestMethod.GET)
    ResponseEntity getBetsByUserName(@RequestParam("username") String username) {
        logger.info(messageSource.getMessage("controller.bet.get.by.username", new Object[]{username}, Locale.getDefault()));
        if (userService.findByUserName(username).isPresent()) {
            logger.info(messageSource.getMessage("controller.bet.get.by.username.ok", new Object[]{username}, Locale.getDefault()));
            return ResponseEntity.ok(betService.findByUserName(username));
        } else {
            logger.info(messageSource.getMessage("controller.bet.get.by.username.error", new Object[]{username}, Locale.getDefault()));
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity saveBet(@RequestBody Bet bet) {
        logger.info(messageSource.getMessage("controller.bet.post.save.bet", new Object[]{bet}, Locale.getDefault()));
        if(!auctionService.findById(bet.getAuction_id()).isPresent()
                || !userService.findByUserName(bet.getUser_name()).isPresent()) {
            logger.info(messageSource.getMessage("controller.bet.post.save.bet.error", new Object[]{bet}, Locale.getDefault()));
            return ResponseEntity.unprocessableEntity().build();
        }

        Bet result = new Bet();

        result.setAuction(auctionService.findById(bet.getAuction_id()).get());
        result.setUser(userService.findByUserName(bet.getUser_name()).get());
        result.setBetTime(bet.getBetTime());
        result.setPrice(bet.getPrice());

        result = betService.save(result);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("?id={id}")
                .buildAndExpand(result.getId()).toUri();

        logger.info(messageSource.getMessage("controller.bet.post.save.bet.ok", new Object[]{result}, Locale.getDefault()));
        return ResponseEntity.created(location).body(result);
    }

    @RequestMapping(params = "delete", method = RequestMethod.DELETE)
    ResponseEntity deleteBet(@RequestParam("delete") Long id) {
        logger.info(messageSource.getMessage("controller.bet.delete.bet", new Object[]{id}, Locale.getDefault()));
        if (betService.findById(id).isPresent()) {
            betService.deleteById(id);
            logger.info(messageSource.getMessage("controller.bet.delete.bet.ok", new Object[]{id}, Locale.getDefault()));
            return ResponseEntity.ok().build();
        } else {
            logger.info(messageSource.getMessage("controller.bet.error.bet.not.found", new Object[]{id}, Locale.getDefault()));
            return ResponseEntity.notFound().build();
        }
    }

}
