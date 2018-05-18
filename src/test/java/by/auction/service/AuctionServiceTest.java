package by.auction.service;

import by.auction.entity.Auction;
import by.auction.repository.AuctionRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import by.auction.config.TestContext;
import by.auction.config.TestServiceContext;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {TestContext.class, TestServiceContext.class})
@WebAppConfiguration
public class AuctionServiceTest {

    @Autowired
    private AuctionService auctionService;

    @Autowired
    private AuctionRepository auctionRepositoryMock;

    @Autowired
    private List<Auction> auctions;

    @Test
    public void findAll() {
        when(auctionRepositoryMock.findAll()).thenReturn(auctions);

        List<Auction> result = auctionService.findAll();
        assertNotNull(result);
        assertEquals(result, auctions);
    }

    @Test
    public void findById() {
        when(auctionRepositoryMock.findById(0L)).thenReturn(Optional.of(auctions.get(0)));

        Optional<Auction> result = auctionService.findById(0L);
        assertNotNull(result);
        assertEquals(result.isPresent(), true);
        assertEquals(result.get(), auctions.get(0));
    }

    @Test
    public void findFinished() {
        when(auctionRepositoryMock.findByFinished(true)).thenReturn(auctions);

        List<Auction> result = auctionService.findFinished(true);
        assertNotNull(result);
        assertEquals(result, auctions);
    }

    @Test
    public void findByCategoryName() {
        when(auctionRepositoryMock.findByProductCategoryName("FirstCategory")).thenReturn(auctions);

        List<Auction> result = auctionService.findByCategoryName("FirstCategory");
        assertNotNull(result);
        assertEquals(result, auctions);
    }

    @Test
    public void findByProductNameContains() {
        when(auctionRepositoryMock.findByProductNameContains("FirstProduct")).thenReturn(auctions);

        List<Auction> result = auctionService.findByProductNameContains("FirstProduct");
        assertNotNull(result);
        assertEquals(result, auctions);
    }

    @Test
    public void findByUserName() {
        when(auctionRepositoryMock.findByOwnerUserName("FirstUser")).thenReturn(auctions);

        List<Auction> result = auctionService.findByUserName("FirstUser");
        assertNotNull(result);
        assertEquals(result, auctions);
    }

    @Test
    public void findByEndTimeLessThan() {
        when(auctionRepositoryMock.findByEndTimeIsLessThan(new Date(2000000000))).thenReturn(auctions);

        List<Auction> result = auctionService.findByEndTimeLessThan(new Date(2000000000));
        assertNotNull(result);
        assertEquals(result, auctions);
    }

    @Test
    public void save() {
        Auction neAuction = new Auction();
        neAuction = auctions.get(0);
        when(auctionRepositoryMock.save(neAuction)).thenReturn(auctions.get(0));

        Auction result = auctionService.save(neAuction);
        assertNotNull(result);
        assertEquals(result, auctions.get(0));
    }

    @Test
    public void deleteById() {
    }
}