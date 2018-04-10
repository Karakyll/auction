package by.auction.repository;

import by.auction.entity.Auction;
import by.auction.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long>{

    List<Auction> findAll();

    Optional<Auction> findById(Long id);

    List<Auction> findAuctionsByFinished(Boolean finished);

    List<Auction> findAuctionsByProductCategory(Category category);

    List<Auction> findAuctionsByProductNameContains(String searchTag);

    List<Auction> findAuctionsByOwnerUserName(String userName);

    List<Auction> findAuctionsByEndTimeIsLessThan(Date date);

}
