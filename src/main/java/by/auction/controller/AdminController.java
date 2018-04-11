package by.auction.controller;

import by.auction.entity.User;
import by.auction.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

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
            result.setEnabled(user.getEnabled());

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
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
