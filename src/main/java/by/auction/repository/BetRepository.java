package by.auction.repository;

import by.auction.entity.Bet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repository for data management in a table "bets"
 */
public interface BetRepository extends JpaRepository<Bet, Long>{

    /**
     * Find bets by auction id
     * @param id - auction identifier
     * @return - List of found bets
     */
    List<Bet> findByAuctionId(Long id);

    /**
     * FInd bets by Username
     * @param userName - username whose bets we look for
     * @return - List of found bets
     */
    List<Bet> findByUserUserName(String userName);

}
