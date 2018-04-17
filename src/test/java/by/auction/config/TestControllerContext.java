package by.auction.config;

import by.auction.service.AuctionService;
import by.auction.service.CategoryService;
import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TestControllerContext {

    @Bean
    public AuctionService auctionService() {
        return Mockito.mock(AuctionService.class);
    }

    @Bean
    public CategoryService categoryService() {
        return Mockito.mock(CategoryService.class);
    }

}
