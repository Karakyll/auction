package by.auction.repository;

import by.auction.entity.Bet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repository for data management in a table "bets"
 */
public interface BetRepository extends JpaRepository<Bet, Long>{

    List<Bet> findByAuctionId(Long id);

    List<Bet> findByUserUserName(String userName);

}
