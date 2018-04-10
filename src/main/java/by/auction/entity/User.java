package by.auction.entity;

import javax.persistence.*;
import java.util.Set;

/**
 * Класс для маппинга сущности Пользователь на таблицу в БД.
 */
@Entity
@Table(name = "users")
public class User {

    private String userName;
    private String password;
    private Set<Role> roles;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "username", nullable = false, unique = true, length = 50)
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Column(name = "password", nullable = false)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
