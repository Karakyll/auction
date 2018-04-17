package by.auction.config;

import by.auction.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.mock;

public class TestContext {

    @Autowired
    private WebApplicationContext context;

    @Bean
    public MessageSource messageSource(){
        return mock(MessageSource.class);
    }

    @Bean
    public MockMvc mockMvc() {
        return MockMvcBuilders
                .webAppContextSetup(context)
                .build();
    }

    @Bean
    public MediaType application_JSON_UTF8() {
        return new MediaType(MediaType.APPLICATION_JSON.getType(),
                MediaType.APPLICATION_JSON.getSubtype(),
                Charset.forName("utf8")
        );
    }

    @Bean
    public List<Category> categories() {
        Category first = new Category("FirstCategory");
        Category second = new Category("SecondCategory");
        return Arrays.asList(first, second);
    }

    @Bean
    public List<Product> products() {
        Product first = new Product();
        first.setId(1L);
        first.setName("FirstProduct");
        first.setCategory(categories().get(0));
        first.setPrice(11.11);
        first.setDescription("FirstDescription");

        Product second = new Product();
        second.setId(2L);
        second.setName("SecondProduct");
        second.setCategory(categories().get(1));
        second.setPrice(22.22);
        second.setDescription("SecondDescription");

        Product third = new Product();
        third.setId(3L);
        third.setName("ThirdProduct");
        third.setCategory(categories().get(0));
        third.setPrice(33.33);
        third.setDescription("ThirdDescription");

        Product fourth = new Product();
        fourth.setId(4L);
        fourth.setName("FourthProduct");
        fourth.setCategory(categories().get(1));
        fourth.setPrice(44.44);
        fourth.setDescription("FourthDescription");

        return Arrays.asList(first, second, third, fourth);
    }

    @Bean
    public List<User> users() {
        User first = new User();
        first.setUserName("FirstUser");
        first.setPassword("FirstPassword");
        first.setEnabled(true);

        User second = new User();
        second.setUserName("SecondUser");
        second.setPassword("SecondPassword");
        second.setEnabled(true);

        User third = new User();
        third.setUserName("ThirdUser");
        third.setPassword("ThirdPassword");
        third.setEnabled(false);

        return Arrays.asList(first, second, third);
    }

    @Bean
    public List<Auction> auctions() {
        Auction first = new Auction();
        first.setId(1L);
        first.setProduct(products().get(0));
        first.setDescription("FirstAuctionDescription");
        first.setFinished(true);
        first.setEndTime(new Date(10000000));
        first.setCreateTime(new Date(1000000));
        first.setOwner(users().get(0));

        Auction second = new Auction();
        second.setId(2L);
        second.setProduct(products().get(1));
        second.setDescription("SecondAuctionDescription");
        second.setFinished(false);
        second.setEndTime(new Date(20000000));
        second.setCreateTime(new Date(2000000));
        second.setOwner(users().get(1));

        Auction third = new Auction();
        third.setId(3L);
        third.setProduct(products().get(2));
        third.setDescription("ThirdAuctionDescription");
        third.setFinished(false);
        third.setEndTime(new Date(30000000));
        third.setCreateTime(new Date(3000000));
        third.setOwner(users().get(1));

        Auction fourth = new Auction();
        fourth.setId(4L);
        fourth.setProduct(products().get(3));
        fourth.setDescription("FourthAuctionDescription");
        fourth.setFinished(false);
        fourth.setEndTime(new Date(40000000));
        fourth.setCreateTime(new Date(4000000));
        fourth.setOwner(users().get(2));

        return Arrays.asList(first, second, third, fourth);
    }

    @Bean
    public List<Bet> bets() {
        Bet first = new Bet();
        first.setId(1L);
        first.setAuction(auctions().get(0));
        first.setUser(users().get(1));
        first.setBetTime(new Date(1000000000));
        first.setPrice(11.11);

        Bet second = new Bet();
        second.setId(2L);
        second.setAuction(auctions().get(0));
        second.setUser(users().get(2));
        second.setBetTime(new Date(2000000000));
        second.setPrice(22.22);

        Bet third = new Bet();
        third.setId(3L);
        third.setAuction(auctions().get(1));
        third.setUser(users().get(0));
        third.setBetTime(new Date(1000000000));
        third.setPrice(33.33);

        Bet fourth = new Bet();
        fourth.setId(4L);
        fourth.setAuction(auctions().get(1));
        fourth.setUser(users().get(2));
        fourth.setBetTime(new Date(2000000000));
        fourth.setPrice(44.44);

        Bet fifth = new Bet();
        fifth.setId(5L);
        fifth.setAuction(auctions().get(2));
        fifth.setUser(users().get(0));
        fifth.setBetTime(new Date(1000000000));
        fifth.setPrice(55.55);

        Bet sixth = new Bet();
        sixth.setId(6L);
        sixth.setAuction(auctions().get(2));
        sixth.setUser(users().get(2));
        sixth.setBetTime(new Date(2000000000));
        sixth.setPrice(66.66);

        Bet seventh = new Bet();
        seventh.setId(7L);
        seventh.setAuction(auctions().get(3));
        seventh.setUser(users().get(0));
        seventh.setBetTime(new Date(1000000000));
        seventh.setPrice(77.77);

        Bet eighth = new Bet();
        eighth.setId(8L);
        eighth.setAuction(auctions().get(3));
        eighth.setUser(users().get(1));
        eighth.setBetTime(new Date(1000000000));
        eighth.setPrice(88.88);

        return Arrays.asList(first, second, third, fourth, fifth, sixth, seventh, eighth);
    }

}
