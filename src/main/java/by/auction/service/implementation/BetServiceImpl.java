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

@Service("betService")
@Transactional
public class BetServiceImpl implements BetService {

    @Autowired
    private BetRepository betRepository;

    @Autowired
    private MessageSource messageSource;

    private static final Logger logger = LoggerFactory.getLogger(BetServiceImpl.class);

    @Override
    public List<Bet> findAll() {
        logger.info(messageSource.getMessage("service.bet.find.all", null, Locale.getDefault()));
        return betRepository.findAll();
    }

    @Override
    public Optional<Bet> findById(Long id) {
        logger.info(messageSource.getMessage("service.bet.find.by.id", new Object[]{id}, Locale.getDefault()));
        return betRepository.findById(id);
    }

    @Override
    public List<Bet> findByAuctionId(Long id) {
        logger.info(messageSource.getMessage("service.bet.find.by.auction.id", new Object[]{id}, Locale.getDefault()));
        return betRepository.findBetsByAuctionId(id);
    }

    @Override
    public List<Bet> findByUserName(String userName) {
        logger.info(messageSource.getMessage("service.bet.find.by.user.name", new Object[]{userName}, Locale.getDefault()));
        return betRepository.findBetsByUserUserName(userName);
    }

    @Override
    public Bet save(Bet bet) {
        logger.info(messageSource.getMessage("service.bet.save", new Object[]{bet}, Locale.getDefault()));
        return betRepository.save(bet);
    }

    @Override
    public void deleteById(Long id) {
        logger.info(messageSource.getMessage("service.bet.delete.by.id", new Object[]{id}, Locale.getDefault()));
        betRepository.deleteById(id);
    }
}
