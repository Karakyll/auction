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

/**
 * Implementation for interface AuctionService
 */
@Service("auctionService")
@Transactional
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private MessageSource messageSource;

    private static final Logger logger = LoggerFactory.getLogger(AuctionServiceImpl.class);

    /**
     * Find all auctions in DB
     * @return list of auctions
     */
    @Override
    public List<Auction> findAll() {
        logger.info(messageSource.getMessage("service.auction.find.all", null, Locale.getDefault()));
        return auctionRepository.findAll();
    }

    /**
     * Find auction in DB with ID
     * @param id
     * @return Optional of found result.
     */
    @Override
    public Optional<Auction> findById(Long id) {
        logger.info(messageSource.getMessage("service.auction.find.by.id", new Object[]{id}, Locale.getDefault()));
        return auctionRepository.findById(id);
    }

    /**
     * Find finished or not auctions
     * @param finished - boolean
     * @return list of found auctions
     */
    @Override
    public List<Auction> findFinished(Boolean finished) {
        logger.info(messageSource.getMessage("service.auction.find.finished", new Object[]{finished}, Locale.getDefault()));
        return auctionRepository.findAuctionsByFinished(finished);
    }

    /**
     * Find auctions by category name
     * @param categoryName
     * @return list of found auctions
     */
    @Override
    public List<Auction> findByCategoryName(String categoryName) {
        logger.info(messageSource.getMessage("service.auction.find.by.category.name", new Object[]{categoryName}, Locale.getDefault()));
        return auctionRepository.findAuctionsByProductCategoryName(categoryName);
    }

    /**
     * Find auctions with search tag contains in product name
     * @param searchTag - case-sensitive
     * @return list of found auctions
     */
    @Override
    public List<Auction> findByProductNameContains(String searchTag) {
        logger.info(messageSource.getMessage("service.auction.find.by.product.name", new Object[]{searchTag}, Locale.getDefault()));
        return auctionRepository.findAuctionsByProductNameContains(searchTag);
    }

    /**
     * Find auctions by owner username
     * @param userName
     * @return list of found auctions
     */
    @Override
    public List<Auction> findByUserName(String userName) {
        logger.info(messageSource.getMessage("service.auction.find.by.user.name", new Object[]{userName}, Locale.getDefault()));
        return auctionRepository.findAuctionsByOwnerUserName(userName);
    }

    /**
     * Find auctions what end before input date
     * @param date
     * @return list of found auctions
     */
    @Override
    public List<Auction> findByEndTimeLessThan(Date date) {
        logger.info(messageSource.getMessage("service.auction.find.by.end.time", new Object[]{date}, Locale.getDefault()));
        return auctionRepository.findAuctionsByEndTimeIsLessThan(date);
    }

    /**
     * Save auction to DB
     * @param auction
     * @return saved auction
     */
    @Override
    public Auction save(Auction auction) {
        logger.info(messageSource.getMessage("service.auction.save", new Object[]{auction}, Locale.getDefault()));
        return auctionRepository.save(auction);
    }

    /**
     * Delete auction by ID
     * @param id
     */
    @Override
    public void deleteById(Long id) {
        logger.info(messageSource.getMessage("service.auction.delete.by.id", new Object[]{id}, Locale.getDefault()));
        auctionRepository.deleteById(id);
    }
}
