package by.auction.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = { "/", "/about" })
@CrossOrigin
public class MainController {

    @RequestMapping(method = RequestMethod.GET)
    public String index() {
        return "Hello!";
    }

    @RequestMapping(value = { "/manager" }, method = RequestMethod.GET)
    public String manager() {
        return "Hello, Manager!";
    }

    @RequestMapping(value = { "/admin" }, method = RequestMethod.GET)
    public String admin() {
        return "Hello, Admin!";
    }

}
