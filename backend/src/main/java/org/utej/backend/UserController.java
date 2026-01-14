package org.utej.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<User> create(@RequestBody User user) {
        return ResponseEntity.ok(userService.save(user));
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAll() {
        return ResponseEntity.ok(userService.findAll());
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = userService.findByEmail(request.getEmail());

        if (user == null) {
            return ResponseEntity.status(401).body("User not found");
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(401).body("Invalid password");
        }

        return ResponseEntity.ok(user);
    }

}
