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

import java.net.URI;
import java.util.Locale;

/**
 * Rest controller. Implement admin api to manage users.
 * Map all /admin requests
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private MessageSource messageSource;

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    /**
     * Map /admin GET request.
     * @return - string with "hello" message
     */
    @RequestMapping(method = RequestMethod.GET)
    public String helloAdmin() {
        logger.debug(messageSource.getMessage("controller.admin.hello", null, Locale.getDefault()));
        return messageSource.getMessage("hello.admin", null, Locale.getDefault());
    }

    /**
     * Map /admin/users GET requests.
     * Find all users
     * @return - JSON with all users.
     */
    @RequestMapping(value = "/users", method = RequestMethod.GET)
    ResponseEntity getAllUsers() {
        logger.debug(messageSource.getMessage("controller.admin.users.get", null, Locale.getDefault()));
        return ResponseEntity.ok(userService.findAll());
    }

    /**
     * Map /admin/users?username= GET requests
     * Find user by username
     * If user noit found - response with NotFound status
     * @param username
     * @return - JSON with requested user
     */
    @RequestMapping(value = "/users", params = "username", method = RequestMethod.GET)
    ResponseEntity getUserByUsername(@RequestParam("username") String username) {
        logger.debug(messageSource.getMessage("controller.admin.users.get.user.by.username", new Object[]{username}, Locale.getDefault()));
        if (userService.findByUserName(username).isPresent()) {
            logger.debug(messageSource.getMessage("controller.admin.users.get.user.by.username.ok", new Object[]{username}, Locale.getDefault()));
            return ResponseEntity.ok(userService.findByUserName(username).get());
        } else {
            logger.debug(messageSource.getMessage("controller.admin.users.error.user.not.found", new Object[]{username}, Locale.getDefault()));
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Map /admin/users?enabled= GET requests
     * Find users by enabled or disabled
     * @param enabled - true or false
     * @return - JSON with enabled/disabled users.
     */
    @RequestMapping(value = "/users", params = "enabled", method = RequestMethod.GET)
    ResponseEntity getAllEnabledUsers(@RequestParam("enabled") Boolean enabled) {
        logger.debug(messageSource.getMessage("controller.admin.users.get.user.by.enabled", new Object[]{enabled}, Locale.getDefault()));
        return ResponseEntity.ok(userService.findByEnabled(enabled));
    }

    /**
     * Map /admin/users POST requests.
     * Save user
     * If user specified in body is present yet - response with UnprocessableEntity status
     * @param user - requested body with user JSON
     * @return - link to created user with JSON in body.
     */
    @RequestMapping(value = "/users", method = RequestMethod.POST)
    ResponseEntity saveUser(@RequestBody User user) {
        logger.debug(messageSource.getMessage("controller.admin.users.post.save.user", new Object[]{user.getUserName()}, Locale.getDefault()));
        if (userService.findByUserName(user.getUserName()).isPresent()) {
            logger.debug(messageSource.getMessage("controller.admin.users.post.save.user.error", new Object[]{user.getUserName()}, Locale.getDefault()));
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

            logger.debug(messageSource.getMessage("controller.admin.users.post.save.user.ok", new Object[]{result.getUserName()}, Locale.getDefault()));
            return ResponseEntity.created(location).body(result);
        }
    }

    /**
     * Map /admin/users?delete= DELETE requests
     * Delete user by username
     * If user not found - response with NotFound status
     * @param username
     * @return - status Ok
     */
    @RequestMapping(value = "/users", params = "delete", method = RequestMethod.DELETE)
    ResponseEntity deleteUser(@RequestParam("delete") String username) {
        logger.debug(messageSource.getMessage("controller.admin.users.delete.user", new Object[]{username}, Locale.getDefault()));
        if (userService.findByUserName(username).isPresent()) {
            userService.deleteByUserName(username);
            logger.debug(messageSource.getMessage("controller.admin.users.delete.user.ok", new Object[]{username}, Locale.getDefault()));
            return ResponseEntity.ok().build();
        } else {
            logger.debug(messageSource.getMessage("controller.admin.users.delete.user.error", new Object[]{username}, Locale.getDefault()));
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Map /admin/users?enable=*&username= PUT requests
     * Enable or disable user by username
     * If user not found - response with NotFound status
     * @param enable
     * @param username
     * @return - status Ok with changed user in body
     */
    @RequestMapping(value = "/users", params = {"enable", "username"}, method = RequestMethod.PUT)
    ResponseEntity enableUser(@RequestParam("enable") Boolean enable, @RequestParam("username") String username) {
        logger.debug(messageSource.getMessage("controller.admin.users.put.enable.user", new Object[]{enable, username}, Locale.getDefault()));
        if (userService.findByUserName(username).isPresent()) {
            userService.enable(enable, username);
            logger.debug(messageSource.getMessage("controller.admin.users.put.enable.user.ok", new Object[]{username, enable}, Locale.getDefault()));
            return ResponseEntity.ok(userService.findByUserName(username).get());
        } else {
            logger.debug(messageSource.getMessage("controller.admin.users.error.user.not.found", new Object[]{username}, Locale.getDefault()));
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Map /admin/users?promote=*&username= PUT requests
     * Promote or demote user by username
     * If user not found - response with NotFound status
     * @param promote - true or false
     * @param username
     * @return - status Ok with changed user in body
     */
    @RequestMapping(value = "/users", params = {"promote", "username"}, method = RequestMethod.PUT)
    ResponseEntity promoteUser(@RequestParam("promote") Boolean promote, @RequestParam("username") String username) {
        logger.debug(messageSource.getMessage("controller.admin.users.put.promote.user", new Object[]{promote, username}, Locale.getDefault()));
        if (promote && userService.findByUserName(username).isPresent()) {
            userService.promote(username);
            logger.debug(messageSource.getMessage("controller.admin.users.put.promote.user.ok", new Object[]{username}, Locale.getDefault()));
            return ResponseEntity.ok(userService.findByUserName(username).get());
        }
        if (!promote && userService.findByUserName(username).isPresent()) {
            userService.demote(username);
            logger.debug(messageSource.getMessage("controller.admin.users.put.demote.user.ok", new Object[]{username}, Locale.getDefault()));
            return ResponseEntity.ok(userService.findByUserName(username).get());
        }
        logger.debug(messageSource.getMessage("controller.admin.users.error.user.not.found", new Object[]{username}, Locale.getDefault()));
        return ResponseEntity.notFound().build();
    }

    /**
     * Map /admin/users PUT requests.
     * Edit user
     * If user specified in body not found - response with NotFound status
     * @param user - requested body with user JSON
     * @return - link to created user with JSON in body.
     */
    @RequestMapping(value = "/users", method = RequestMethod.PUT)
    ResponseEntity editUser(@RequestBody User user) {
        logger.debug(messageSource.getMessage("controller.admin.users.put.edit.user", new Object[]{user.getUserName()}, Locale.getDefault()));
        if (!userService.findByUserName(user.getUserName()).isPresent()) {
            logger.debug(messageSource.getMessage("controller.admin.users.put.edit.user.error", new Object[]{user.getUserName()}, Locale.getDefault()));
            return ResponseEntity.notFound().build();
        } else {
            User result = new User();

            result.setUserName(user.getUserName());
            result.setPassword(user.getSet_password());
            result.setEnabled(user.getEnabled());

            result = userService.save(result);

            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest().path("?username={username}")
                    .buildAndExpand(result.getUserName()).toUri();

            logger.debug(messageSource.getMessage("controller.admin.users.put.edit.user.ok", new Object[]{result.getUserName()}, Locale.getDefault()));
            return ResponseEntity.created(location).body(result);
        }
    }

}
