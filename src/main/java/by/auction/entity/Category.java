package by.auction.entity;

import javax.persistence.*;


/**
 * Класс для маппинга сущности Категория на таблицу в БД.
 */
@Entity
@Table(name = "categories")
public class Category {

    private String name;

    @Id
    @Column(name = "name", nullable = false, unique = true, length = 50)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
