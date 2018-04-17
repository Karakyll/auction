package by.auction.config;

import by.auction.repository.AuctionRepository;
import by.auction.service.AuctionService;
import by.auction.service.implementation.AuctionServiceImpl;
import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;

public class TestServiceContext {

    @Bean
    public AuctionService auctionServiceImpl() {
        return new AuctionServiceImpl();
    }

    @Bean
    public AuctionRepository auctionRepository() {
        return Mockito.mock(AuctionRepository.class);
    }

}
