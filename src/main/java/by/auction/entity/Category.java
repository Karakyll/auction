package by.auction.entity;

import javax.persistence.*;

@Entity
@Table(name = "categories")
public class Category {

    private String name;

    @Id
    @Column(name = "name", nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
