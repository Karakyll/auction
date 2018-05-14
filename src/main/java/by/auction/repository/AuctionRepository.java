package by.auction.repository;

import by.auction.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

/**
 * Repository for data management in a table "auctions"
 */
public interface AuctionRepository extends JpaRepository<Auction, Long>{

    /**
     * Finds all finished auctions
     * @param finished
     * @return
     */
    List<Auction> findByFinished(boolean finished);

    List<Auction> findByProductCategoryName(String categoryName);

    List<Auction> findByProductNameContains(String searchTag);

    List<Auction> findByOwnerUserName(String userName);

    List<Auction> findByEndTimeIsLessThan(Date date);

}
