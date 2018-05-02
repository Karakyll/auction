package by.auction.service.implementation;

import by.auction.entity.Bet;
import by.auction.repository.BetRepository;
import by.auction.service.BetService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

/**
 * Implementation for interface BetService
 */
@Service("betService")
@Transactional
public class BetServiceImpl implements BetService {

    @Autowired
    private BetRepository betRepository;

    @Autowired
    private MessageSource messageSource;

    private static final Logger logger = LoggerFactory.getLogger(BetServiceImpl.class);

    /**
     * Find all bets
     * @return list of found bets
     */
    @Override
    public List<Bet> findAll() {
        logger.debug(messageSource.getMessage("service.bet.find.all", null, Locale.getDefault()));
        return betRepository.findAll();
    }

    /**
     * Find bet by ID
     * @param id
     * @return Optional of found result
     */
    @Override
    public Optional<Bet> findById(Long id) {
        logger.debug(messageSource.getMessage("service.bet.find.by.id", new Object[]{id}, Locale.getDefault()));
        return betRepository.findById(id);
    }

    /**
     * Find bets by auction ID
     * @param id
     * @return list of found bets
     */
    @Override
    public List<Bet> findByAuctionId(Long id) {
        logger.debug(messageSource.getMessage("service.bet.find.by.auction.id", new Object[]{id}, Locale.getDefault()));
        return betRepository.findBetsByAuctionId(id);
    }

    /**
     * Find bets by username
     * @param userName
     * @return list of found bets
     */
    @Override
    public List<Bet> findByUserName(String userName) {
        logger.debug(messageSource.getMessage("service.bet.find.by.user.name", new Object[]{userName}, Locale.getDefault()));
        return betRepository.findBetsByUserUserName(userName);
    }

    /**
     * Save bet to DB
     * @param bet
     * @return saved bet
     */
    @Override
    public Bet save(Bet bet) {
        logger.debug(messageSource.getMessage("service.bet.save", new Object[]{bet}, Locale.getDefault()));
        return betRepository.save(bet);
    }

    /**
     * Delete bet by ID
     * @param id
     */
    @Override
    public void deleteById(Long id) {
        logger.debug(messageSource.getMessage("service.bet.delete.by.id", new Object[]{id}, Locale.getDefault()));
        betRepository.deleteById(id);
    }
}
