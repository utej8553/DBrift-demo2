package org.utej.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/db")
@CrossOrigin(origins = "*")
public class DatabaseController {

    private final DatabaseService databaseService;

    public DatabaseController(DatabaseService databaseService) {
        this.databaseService = databaseService;
    }

    @PostMapping("/create")
    public ResponseEntity<Database> create(
            @RequestBody CreateDatabaseRequest request
    ) {
        return ResponseEntity.ok(databaseService.createDatabase(request));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Database>> getUserDbs(
            @PathVariable Long userId
    ) {
        return ResponseEntity.ok(databaseService.getUserDatabases(userId));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        databaseService.deleteDatabase(id);
        return ResponseEntity.ok("Database deleted");
    }
}
