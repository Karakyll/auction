package by.auction.controller;

import by.auction.config.AppConfig;
import by.auction.config.TestContext;
import by.auction.config.TestControllerContext;
import by.auction.entity.Auction;
import by.auction.service.AuctionService;
import by.auction.service.CategoryService;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {TestContext.class, TestControllerContext.class, AppConfig.class})
@WebAppConfiguration
public class AuctionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AuctionService auctionServiceMock;

    @Autowired
    private CategoryService categoryServiceMock;

    @Autowired
    private MediaType application_JSON_UTF8;

    @Autowired
    private List<Auction> auctions;

    private static byte[] convertObjectToJsonBytes(Object object) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        return mapper.writeValueAsBytes(object);
    }

    @Test
    public void getAllAuctions_ShouldReturnListOfAuctions() throws Exception {
        when(auctionServiceMock.findAll()).thenReturn(auctions);

        mockMvc.perform(get("/api/auctions"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(application_JSON_UTF8))
                .andExpect(jsonPath("$", hasSize(4)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].owner_name", is("FirstUser")))
                .andExpect(jsonPath("$[0].product.id", is(1)))
                .andExpect(jsonPath("$[0].product.name", is("FirstProduct")))
                .andExpect(jsonPath("$[0].description", is("FirstAuctionDescription")))
                .andExpect(jsonPath("$[0].finished", is(true)))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].owner_name", is("SecondUser")))
                .andExpect(jsonPath("$[1].product.id", is(2)))
                .andExpect(jsonPath("$[1].finished", is(false)))
                .andExpect(jsonPath("$[2].id", is(3)))
                .andExpect(jsonPath("$[2].owner_name", is("SecondUser")))
                .andExpect(jsonPath("$[2].product.id", is(3)))
                .andExpect(jsonPath("$[3].id", is(4)))
                .andExpect(jsonPath("$[3].owner_name", is("ThirdUser")))
                .andExpect(jsonPath("$[3].product.id", is(4)));

        verify(auctionServiceMock, times(1)).findAll();
        verifyNoMoreInteractions(auctionServiceMock);
    }

    @Test
    public void getAuctionById_ShouldReturnAuctionWithID() throws Exception {
        when(auctionServiceMock.findById(3L)).thenReturn(Optional.of(auctions.get(2)));

        mockMvc.perform(get("/api/auctions/{id}", 3L))
                .andExpect(status().isOk())
                .andExpect(content().contentType(application_JSON_UTF8))
                .andExpect(jsonPath("$.id", is(3)))
                .andExpect(jsonPath("$.owner_name", is("SecondUser")))
                .andExpect(jsonPath("$.product.id", is(3)))
                .andExpect(jsonPath("$.product.name", is("ThirdProduct")))
                .andExpect(jsonPath("$.description", is("ThirdAuctionDescription")))
                .andExpect(jsonPath("$.finished", is(false)));

        verify(auctionServiceMock, times(2)).findById(3L);
        verifyNoMoreInteractions(auctionServiceMock);
    }

    @Test
    public void getAllOngoingAuctions() {
    }

    @Test
    public void getAuctionsByCategory_CategoryNotFound_ShouldReturnStatusCode404() throws Exception {
        when(categoryServiceMock.findByName("test")).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/auctions").param("category", "test"))
                .andExpect(status().isNotFound());

        verify(auctionServiceMock, times(0)).findByCategoryName("test");
        verify(categoryServiceMock, times(1)).findByName("test");
        verifyNoMoreInteractions(auctionServiceMock);
        verifyNoMoreInteractions(categoryServiceMock);
    }

    @Test
    public void getAuctionsWithProductsContain() {
    }

    @Test
    public void getAuctionsByUserName() {
    }

    @Test
    public void getAuctionsByEndTime() {
    }

    @Test
    public void saveAuction() {
    }

    @Test
    public void deleteAuction() {
    }

    @Test
    public void finishAuction() {
    }
}