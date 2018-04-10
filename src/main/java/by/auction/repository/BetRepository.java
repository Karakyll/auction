package by.auction.repository;

import by.auction.entity.Bet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BetRepository extends JpaRepository<Bet, Long>{

    List<Bet> findAll();

    Optional<Bet> findById(Long id);

    List<Bet> findBetsByAuctionId(Long id);

    List<Bet> findBetsByUserUserName(String userName);

}
