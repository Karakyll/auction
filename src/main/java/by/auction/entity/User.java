package by.auction.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * Mapping entity to DB table "users"
 */
@Entity
@Table(name = "users")
public class User implements Serializable {

    private String userName;
    private String password;
    private String set_password;
    private Boolean enabled;
    private Set<Role> roles;

    @Id
    @Column(name = "username", nullable = false, unique = true, length = 50)
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @JsonIgnore
    @Column(name = "password", nullable = false)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * This field need to create user. Usual password filed is JsonIgnored.
     * @return
     */
    @Transient
    public String getSet_password() {
        return set_password;
    }

    @Column(name = "enabled", nullable = false)
    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
