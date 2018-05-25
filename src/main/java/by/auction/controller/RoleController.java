package by.auction.controller;

import by.auction.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    /**
     * Map /api/roles GET requests
     * find roles by username
     * If user not found - response with NotFound status
     * @param username
     * @return
     */
    @RequestMapping(params = "username", method = RequestMethod.GET)
    ResponseEntity findUserRoles(@RequestParam("username") String username) {
        logger.info(messageSource.getMessage("controller.role.get.by.username", new Object[]{username}, Locale.getDefault()));
        if (userService.findByUserName(username).isPresent()) {
            logger.debug(messageSource.getMessage("controller.role.get.by.username.ok", new Object[]{username}, Locale.getDefault()));
            return ResponseEntity.ok(userService.findByUserName(username).get().getRoles());
        }
        logger.debug(messageSource.getMessage("controller.role.error.user.not.found", new Object[]{username}, Locale.getDefault()));
        return ResponseEntity.notFound().build();
    }

}


