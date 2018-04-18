package by.auction.service;

import by.auction.entity.Auction;

import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * Service for data management in a table "auctions"
 */
public interface AuctionService {

    List<Auction> findAll();

    Optional<Auction> findById(Long id);

    List<Auction> findFinished(Boolean finished);

    List<Auction> findByCategoryName(String categoryName);

    List<Auction> findByProductNameContains(String searchTag);

    List<Auction> findByUserName(String userName);

    List<Auction> findByEndTimeLessThan(Date date);

    Auction save(final Auction auction);

    void deleteById(Long id);

}
