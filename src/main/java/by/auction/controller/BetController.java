package by.auction.controller;

import by.auction.entity.Bet;
import by.auction.service.AuctionService;
import by.auction.service.BetService;
import by.auction.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

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

    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity getAllBets() {
        return ResponseEntity.ok(betService.findAll());
    }

    @RequestMapping(params = "id", method = RequestMethod.GET)
    ResponseEntity getBetById(@RequestParam("id") Long id) {
        if (betService.findById(id).isPresent()) {
            return ResponseEntity.ok(betService.findById(id).get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(params = "auctionId", method = RequestMethod.GET)
    ResponseEntity getBetsByAuctionId(@RequestParam("auctionId") Long auctionId) {
        if (auctionService.findById(auctionId).isPresent()) {
            return ResponseEntity.ok(betService.findByAuctionId(auctionId));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(params = "username", method = RequestMethod.GET)
    ResponseEntity getBetsByUserName(@RequestParam("username") String username) {
        if (userService.findByUserName(username).isPresent()) {
            return ResponseEntity.ok(betService.findByUserName(username));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity saveBet(@RequestBody Bet bet) {
        if(!auctionService.findById(bet.getAuction_id()).isPresent()
                || !userService.findByUserName(bet.getUser_name()).isPresent()) {
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

        return ResponseEntity.created(location).body(result);
    }

    @RequestMapping(params = "delete", method = RequestMethod.DELETE)
    ResponseEntity deleteBet(@RequestParam("delete") Long id) {
        if (betService.findById(id).isPresent()) {
            betService.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
