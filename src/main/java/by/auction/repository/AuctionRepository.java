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
     * Find auctions by finished param
     * @param finished - auction status, boolean
     * @return - List of found auctions
     */
    List<Auction> findByFinished(boolean finished);

    /**
     * Find auctions by category name
     * @param categoryName - name of category
     * @return - List of found auctions
     */
    List<Auction> findByProductCategoryName(String categoryName);

    /**
     * Find auctions with product name contain search tag
     * @param searchTag - string, which contains in product name
     * @return - List of found auctions
     */
    List<Auction> findByProductNameContains(String searchTag);

    /**
     * Find auctions by owner username
     * @param userName - username of auction owner
     * @return - List of found auctions
     */
    List<Auction> findByOwnerUserName(String userName);

    /**
     * Find auctions which ends before param date
     * @param date - date before which auctions should end
     * @return - List of found auctions
     */
    List<Auction> findByEndTimeIsLessThan(Date date);

}
