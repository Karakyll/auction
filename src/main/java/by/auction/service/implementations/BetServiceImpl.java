package by.auction.service.implementations;

import by.auction.entity.Bet;
import by.auction.repository.BetRepository;
import by.auction.service.BetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service("betService")
@Transactional
public class BetServiceImpl implements BetService {

    @Autowired
    private BetRepository betRepository;

    @Override
    public List<Bet> findAll() {
        return betRepository.findAll();
    }

    @Override
    public Optional<Bet> findById(Long id) {
        return betRepository.findById(id);
    }

    @Override
    public List<Bet> findByAuctionId(Long id) {
        return betRepository.findBetsByAuctionId(id);
    }

    @Override
    public List<Bet> findByUserName(String userName) {
        return betRepository.findBetsByUserUserName(userName);
    }

    @Override
    public Bet save(Bet bet) {
        return betRepository.save(bet);
    }

    @Override
    public void deleteById(Long id) {
        betRepository.deleteById(id);
    }
}
