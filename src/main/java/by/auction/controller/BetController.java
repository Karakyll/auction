package by.auction.controller;

import by.auction.entity.Bet;
import by.auction.service.BetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/bets")
@CrossOrigin
public class BetController {

    @Autowired
    private BetService betService;

    @RequestMapping(method = RequestMethod.GET)
    List<Bet> getAllBets() {
        return betService.findAll();
    }

}
