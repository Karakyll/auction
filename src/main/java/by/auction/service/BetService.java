package by.auction.service;

import by.auction.entity.Bet;

import java.util.List;
import java.util.Optional;

/**
 * Service for data management in a table "bets"
 */
public interface BetService {

    /**
     * Find all bets
     * @return list of found bets
     */
    List<Bet> findAll();

    /**
     * Find bet by ID
     * @param id
     * @return Optional of found result
     */
    Optional<Bet> findById(Long id);

    /**
     * Find bets by auction ID
     * @param id
     * @return list of found bets
     */
    List<Bet> findByAuctionId(Long id);

    /**
     * Find bets by username
     * @param userName
     * @return list of found bets
     */
    List<Bet> findByUserName(String userName);

    /**
     * Save bet to DB
     * @param bet
     * @return saved bet
     */
    Bet save(final Bet bet);

    /**
     * Delete bet by ID
     * @param id
     */
    void deleteById(Long id);

}
