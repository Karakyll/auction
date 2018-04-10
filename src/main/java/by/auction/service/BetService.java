package by.auction.service;

import by.auction.entity.Bet;

import java.util.List;
import java.util.Optional;

public interface BetService {

    List<Bet> findAll();

    Optional<Bet> findById(Long id);

    List<Bet> findByAuctionId(Long id);

    List<Bet> findByUserName(String userName);

    Bet save(final Bet bet);

    void deleteById(Long id);

}
