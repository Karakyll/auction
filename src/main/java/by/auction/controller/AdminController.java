package by.auction.controller;

import by.auction.entity.User;
import by.auction.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import sun.rmi.runtime.NewThreadAction;

import java.net.URI;
import java.util.Locale;

@RestController
@RequestMapping(value = "/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private MessageSource messageSource;

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @RequestMapping(method = RequestMethod.GET)
    public String helloAdmin() {
        logger.info(messageSource.getMessage("controller.admin.hello", null, Locale.getDefault()));
        return messageSource.getMessage("hello.admin", null, Locale.getDefault());
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    ResponseEntity getAllUsers() {
        logger.info(messageSource.getMessage("controller.admin.users.get", null, Locale.getDefault()));
        return ResponseEntity.ok(userService.findAll());
    }

    @RequestMapping(value = "/users", params = "username", method = RequestMethod.GET)
    ResponseEntity getUserByUsername(@RequestParam("username") String username) {
        logger.info(messageSource.getMessage("controller.admin.users.get.user.by.username", new Object[]{username}, Locale.getDefault()));
        if (userService.findByUserName(username).isPresent()) {
            logger.info(messageSource.getMessage("controller.admin.users.get.user.by.username.ok", new Object[]{username}, Locale.getDefault()));
            return ResponseEntity.ok(userService.findByUserName(username).get());
        } else {
            logger.info(messageSource.getMessage("controller.admin.users.error.user.not.found", new Object[]{username}, Locale.getDefault()));
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(value = "/users", params = "enabled", method = RequestMethod.GET)
    ResponseEntity getAllEnabledUsers(@RequestParam("enabled") Boolean enabled) {
        logger.info(messageSource.getMessage("controller.admin.users.get.user.by.enabled", new Object[]{enabled}, Locale.getDefault()));
        return ResponseEntity.ok(userService.findByEnabled(enabled));
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST)
    ResponseEntity saveUser(@RequestBody User user) {
        logger.info(messageSource.getMessage("controller.admin.users.post.save.user", new Object[]{user}, Locale.getDefault()));
        if (userService.findByUserName(user.getUserName()).isPresent()) {
            logger.info(messageSource.getMessage("controller.admin.users.post.save.user.error", new Object[]{user}, Locale.getDefault()));
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

            logger.info(messageSource.getMessage("controller.admin.users.post.save.user.ok", new Object[]{result}, Locale.getDefault()));
            return ResponseEntity.created(location).body(result);
        }
    }

    @RequestMapping(value = "/users", params = "delete", method = RequestMethod.DELETE)
    ResponseEntity deleteUser(@RequestParam("delete") String username) {
        logger.info(messageSource.getMessage("controller.admin.users.delete.user", new Object[]{username}, Locale.getDefault()));
        if (userService.findByUserName(username).isPresent()) {
            userService.deleteByUserName(username);
            logger.info(messageSource.getMessage("controller.admin.users.delete.user.ok", new Object[]{username}, Locale.getDefault()));
            return ResponseEntity.ok().build();
        } else {
            logger.info(messageSource.getMessage("controller.admin.users.delete.user.error", new Object[]{username}, Locale.getDefault()));
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(value = "/users", params = {"enable", "username"}, method = RequestMethod.PUT)
    ResponseEntity enableUser(@RequestParam("enable") Boolean enable, @RequestParam("username") String username) {
        logger.info(messageSource.getMessage("controller.admin.users.put.enable.user", new Object[]{enable, username}, Locale.getDefault()));
        if (userService.findByUserName(username).isPresent()) {
            userService.enable(enable, username);
            logger.info(messageSource.getMessage("controller.admin.users.put.enable.user.ok", new Object[]{username, enable}, Locale.getDefault()));
            return ResponseEntity.ok(userService.findByUserName(username).get());
        } else {
            logger.info(messageSource.getMessage("controller.admin.users.error.user.not.found", new Object[]{username}, Locale.getDefault()));
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(value = "/users", params = {"promote", "username"}, method = RequestMethod.PUT)
    ResponseEntity promoteUser(@RequestParam("promote") Boolean promote, @RequestParam("username") String username) {
        logger.info(messageSource.getMessage("controller.admin.users.put.promote.user", new Object[]{promote, username}, Locale.getDefault()));
        if (promote && userService.findByUserName(username).isPresent()) {
            userService.promote(username);
            logger.info(messageSource.getMessage("controller.admin.users.put.promote.user.ok", new Object[]{username}, Locale.getDefault()));
            return ResponseEntity.ok(userService.findByUserName(username).get());
        }
        if (!promote && userService.findByUserName(username).isPresent()) {
            userService.demote(username);
            logger.info(messageSource.getMessage("controller.admin.users.put.demote.user.ok", new Object[]{username}, Locale.getDefault()));
            return ResponseEntity.ok(userService.findByUserName(username).get());
        }
        logger.info(messageSource.getMessage("controller.admin.users.error.user.not.found", new Object[]{username}, Locale.getDefault()));
        return ResponseEntity.notFound().build();
    }

}
