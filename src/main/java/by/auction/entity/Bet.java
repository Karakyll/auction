package by.auction.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Mapping entity to DB table "bets"
 */
@Entity
@Table(name = "bets")
public class Bet implements Serializable {

    private Long id;
    private Auction auction;
    private Long auction_id;
    private User user;
    private String user_name;
    private Date betTime;
    private Double price;

    /**
     * Get bet id
     * @return - bet identifier
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    public Long getId() {
        return id;
    }

    /**
     * Set bet id
     * @param id - bet identifier
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Get bet auction
     * Not serialize to JSON
     * @return - bet Auction
     */
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "auction_id")
    public Auction getAuction() {
        return auction;
    }

    /**
     * Set bet auction
     * @param auction - bet Auction
     */
    public void setAuction(Auction auction) {
        this.auction = auction;
    }

    /**
     * This field need to represent only "auction_id" property instead full auction object
     * Not include in mapping to DB
     * @return - auction identifier
     */
    @Transient
    public Long getAuction_id() {
        if (auction_id == null){
            auction_id = auction.getId();
        }
        return auction_id;
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "username")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    /**
     * This field need to represent only "user_name" property instead full user object
     * @return
     */
    @Transient
    public String getUser_name() {
        if (user_name == null) {
            user_name = user.getUserName();
        }
        return user_name;
    }

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "bet_time", nullable = false)
    public Date getBetTime() {
        return betTime;
    }

    public void setBetTime(Date betTime) {
        this.betTime = betTime;
    }

    @Column(name = "price", nullable = false)
    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
