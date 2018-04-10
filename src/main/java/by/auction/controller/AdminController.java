package by.auction.controller;

import by.auction.entity.User;
import by.auction.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
    List<User> getAllUsers() {
        return userService.findAll();
    }

}
