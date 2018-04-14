package by.auction.controller;

import by.auction.entity.Role;
import by.auction.entity.User;
import by.auction.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.management.relation.RoleStatus;
import java.net.URI;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.GET)
    public String helloAdmin() {
        return "Hello, Admin!";
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    ResponseEntity getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @RequestMapping(value = "/users", params = "username", method = RequestMethod.GET)
    ResponseEntity getUserByUsername(@RequestParam("username") String username) {
        if (userService.findByUserName(username).isPresent()) {
            return ResponseEntity.ok(userService.findByUserName(username).get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(value = "/users", params = "enabled", method = RequestMethod.GET)
    ResponseEntity getAllEnabledUsers(@RequestParam("enabled") Boolean enabled) {
        return ResponseEntity.ok(userService.findByEnabled(enabled));
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST)
    ResponseEntity saveUser(@RequestBody User user) {
        if (userService.findByUserName(user.getUserName()).isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        } else {
            User result = new User();

            result.setUserName(user.getUserName());
            result.setPassword(user.getSet_password());
            result.setEnabled(false);

            result = userService.save(result);

            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest().path("?username={username}")
                    .buildAndExpand(result.getUserName()).toUri();

            return ResponseEntity.created(location).body(result);
        }
    }

    @RequestMapping(value = "/users", params = "delete", method = RequestMethod.DELETE)
    ResponseEntity deleteUser(@RequestParam("delete") String username) {
        if (userService.findByUserName(username).isPresent()) {
            userService.deleteByUserName(username);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(value = "/users", params = {"enable", "username"}, method = RequestMethod.PUT)
    ResponseEntity enableUser(@RequestParam("enable") Boolean enable, @RequestParam("username") String username) {
        if (userService.findByUserName(username).isPresent()) {
            userService.enable(enable, username);
            return ResponseEntity.ok(userService.findByUserName(username).get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(value = "/users", params = {"promote", "username"}, method = RequestMethod.PUT)
    ResponseEntity promoteUser(@RequestParam("promote") Boolean promote, @RequestParam("username") String username) {
        if (promote && userService.findByUserName(username).isPresent()) {
            userService.promote(username);
            return ResponseEntity.ok(userService.findByUserName(username).get());
        }
        if (!promote && userService.findByUserName(username).isPresent()) {
            userService.demote(username);
            return ResponseEntity.ok(userService.findByUserName(username).get());
        }
        return ResponseEntity.notFound().build();
    }

}
