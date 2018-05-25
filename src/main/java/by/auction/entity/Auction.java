package by.auction.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Mapping entity to DB table "auctions"
 */
@Entity
@Table(name = "auctions")
public class Auction implements Serializable {

    private Long id;
    private User owner;
    private String owner_name;
    private Product product;
    private Date createTime;
    private Date endTime;
    private String description;
    private Boolean finished;

    /**
     * Get auction ID
     * @return - auction identifier
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    public Long getId() {
        return id;
    }

    /**
     * Set auction ID
     * @param id - auction identifier
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Get auction owner
     * Not serialize to JSON
     * @return - auction owner type of User
     */
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "owner")
    public User getOwner() {
        return owner;
    }

    /**
     * Set auction owner
     * @param owner - User, owner of auction
     */
    public void setOwner(User owner) {
        this.owner = owner;
    }

    /**
     * This field need to represent only "owner_name" property instead full user object
     * Not include in mapping to DB
     * @return - string owner name
     */
    @Transient
    public String getOwner_name() {
        if (owner_name == null){
            owner_name = owner.getUserName();
        }
        return owner_name;
    }

    /**
     * Get auction product
     * @return - Product
     */
    @ManyToOne
    @JoinColumn(name = "product_id")
    public Product getProduct() {
        return product;
    }

    /**
     * Set auction product
     * @param product - Product
     */
    public void setProduct(Product product) {
        this.product = product;
    }

    /**
     * Get auction create time
     * @return - Date of auction
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_time", nullable = false)
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * Set auction create time
     * @param createTime - date of auction
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * Get auction end time
     * @return - date of auction end
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "end_time", nullable = false)
    public Date getEndTime() {
        return endTime;
    }

    /**
     * Set auction end time
     * @param endTime - date of auction end
     */
    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    /**
     * Get auction description
     * @return - string of auction description
     */
    @Column(name = "description", nullable = false)
    public String getDescription() {
        return description;
    }

    /**
     * Set auction description
     * @param description - string of auction descritpion
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Get auction finished status
     * @return - boolean of auction finished status
     */
    @Column(name = "finished", nullable = false)
    public Boolean getFinished() {
        return finished;
    }

    /**
     * Set auction finished status
     * @param finished - boolean of auction finished status
     */
    public void setFinished(Boolean finished) {
        this.finished = finished;
    }
}
