package by.auction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.LocaleResolver;

import java.util.Locale;

@RestController
@RequestMapping(value = { "/", "/about" })
@CrossOrigin
public class MainController {

    @Autowired
    private MessageSource messageSource;

    @RequestMapping(method = RequestMethod.GET)
    public String index() {
        return messageSource.getMessage("hello", null, Locale.getDefault());
    }

    @RequestMapping(value = { "/manager" }, method = RequestMethod.GET)
    public String helloManager() {
        return messageSource.getMessage("hello.manager", null, Locale.getDefault());
    }

}
