package by.auction.service.implementation;

import by.auction.entity.Auction;
import by.auction.repository.AuctionRepository;
import by.auction.service.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service("auctionService")
@Transactional
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;

    @Override
    public List<Auction> findAll() {
        return auctionRepository.findAll();
    }

    @Override
    public Optional<Auction> findById(Long id) {
        return auctionRepository.findById(id);
    }

    @Override
    public List<Auction> findFinished(Boolean finished) {
        return auctionRepository.findAuctionsByFinished(finished);
    }

    @Override
    public List<Auction> findByCategoryName(String categoryName) {
        return auctionRepository.findAuctionsByProductCategoryName(categoryName);
    }

    @Override
    public List<Auction> findByProductNameContains(String searchTag) {
        return auctionRepository.findAuctionsByProductNameContains(searchTag);
    }

    @Override
    public List<Auction> findByUserName(String userName) {
        return auctionRepository.findAuctionsByOwnerUserName(userName);
    }

    @Override
    public List<Auction> findByEndTimeLessThan(Date date) {
        return auctionRepository.findAuctionsByEndTimeIsLessThan(date);
    }

    @Override
    public Auction save(Auction auction) {
        return auctionRepository.save(auction);
    }

    @Override
    public void deleteById(Long id) {
        auctionRepository.deleteById(id);
    }
}
