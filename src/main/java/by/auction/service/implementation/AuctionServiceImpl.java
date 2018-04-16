package by.auction.service.implementation;

import by.auction.entity.Auction;
import by.auction.repository.AuctionRepository;
import by.auction.service.AuctionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service("auctionService")
@Transactional
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private MessageSource messageSource;

    private static final Logger logger = LoggerFactory.getLogger(AuctionServiceImpl.class);

    @Override
    public List<Auction> findAll() {
        logger.info(messageSource.getMessage("service.auction.find.all", null, Locale.getDefault()));
        return auctionRepository.findAll();
    }

    @Override
    public Optional<Auction> findById(Long id) {
        logger.info(messageSource.getMessage("service.auction.find.by.id", new Object[]{id}, Locale.getDefault()));
        return auctionRepository.findById(id);
    }

    @Override
    public List<Auction> findFinished(Boolean finished) {
        logger.info(messageSource.getMessage("service.auction.find.finished", new Object[]{finished}, Locale.getDefault()));
        return auctionRepository.findAuctionsByFinished(finished);
    }

    @Override
    public List<Auction> findByCategoryName(String categoryName) {
        logger.info(messageSource.getMessage("service.auction.find.by.category.name", new Object[]{categoryName}, Locale.getDefault()));
        return auctionRepository.findAuctionsByProductCategoryName(categoryName);
    }

    @Override
    public List<Auction> findByProductNameContains(String searchTag) {
        logger.info(messageSource.getMessage("service.auction.find.by.product.name", new Object[]{searchTag}, Locale.getDefault()));
        return auctionRepository.findAuctionsByProductNameContains(searchTag);
    }

    @Override
    public List<Auction> findByUserName(String userName) {
        logger.info(messageSource.getMessage("service.auction.find.by.user.name", new Object[]{userName}, Locale.getDefault()));
        return auctionRepository.findAuctionsByOwnerUserName(userName);
    }

    @Override
    public List<Auction> findByEndTimeLessThan(Date date) {
        logger.info(messageSource.getMessage("service.auction.find.by.end.time", new Object[]{date}, Locale.getDefault()));
        return auctionRepository.findAuctionsByEndTimeIsLessThan(date);
    }

    @Override
    public Auction save(Auction auction) {
        logger.info(messageSource.getMessage("service.auction.save", new Object[]{auction}, Locale.getDefault()));
        return auctionRepository.save(auction);
    }

    @Override
    public void deleteById(Long id) {
        logger.info(messageSource.getMessage("service.auction.delete.by.id", new Object[]{id}, Locale.getDefault()));
        auctionRepository.deleteById(id);
    }
}
