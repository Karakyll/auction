package by.auction.controller;

import by.auction.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Locale;

/**
 * Rest controller. Implement product api to manage products.
 * Map all /roles requests
 */
@RestController
@RequestMapping(value = "/api/roles")
public class RoleController {

    @Autowired
    private UserService userService;

    @Autowired
    private MessageSource messageSource;

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @RequestMapping(params = "username", method = RequestMethod.GET)
    ResponseEntity getUserRoles(@RequestParam("username") String username) {
        logger.info(messageSource.getMessage("controller.role.get.by.username", new Object[]{username}, Locale.getDefault()));
        if (userService.findByUserName(username).isPresent()) {
            logger.info(messageSource.getMessage("controller.role.get.by.username.ok", new Object[]{username}, Locale.getDefault()));
            return ResponseEntity.ok(userService.findByUserName(username).get().getRoles());
        } else {
            logger.info(messageSource.getMessage("controller.role.error.user.not.found", new Object[]{username}, Locale.getDefault()));
            return ResponseEntity.notFound().build();
        }
    }

}


