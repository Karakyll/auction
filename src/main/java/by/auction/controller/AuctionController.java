package by.auction.controller;

import by.auction.entity.Auction;
import by.auction.service.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/auctions")
@CrossOrigin
public class AuctionController {

    @Autowired
    private AuctionService auctionService;

    @RequestMapping(method = RequestMethod.GET)
    List<Auction> getAllOngoingAuctions() {
        return this.auctionService.findFinished(false);
    }

}
