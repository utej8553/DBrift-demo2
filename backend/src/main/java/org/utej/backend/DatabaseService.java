package org.utej.backend;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DatabaseService {

    private final DatabaseRepository databaseRepository;

    public DatabaseService(DatabaseRepository databaseRepository) {
        this.databaseRepository = databaseRepository;
    }

    public Database createDatabase(CreateDatabaseRequest req) {
        if(Integer.valueOf(GlobalPorts.postgres)>6000){
            System.out.println("Unable to create postgres database");
        }
        String username = req.getDbName() + UUID.randomUUID().toString().substring(0, 6);
        String password = UUID.randomUUID().toString();

        runScript(
                "infra/scripts/postgres/create.sh",
                req.getDbName(),
                username,
                password,
                GlobalPorts.postgres,
                req.getDbVersion()
        );

        Database db = new Database();
        db.setUserId(req.getUserId());
        db.setDbName(req.getDbName());
        db.setDescription(req.getDescription());
        db.setDbType(req.getDbType());
        db.setDbVersion(req.getDbVersion());

        db.setUsername(username);
        db.setPassword(password);
        db.setPort(GlobalPorts.postgres);
        db.setCreatedAt(new Date());
        GlobalPorts.postgres = String.valueOf((Integer.valueOf(GlobalPorts.postgres)+1));

        return databaseRepository.save(db);
    }

    public List<Database> getUserDatabases(Long userId) {
        return databaseRepository.findByUserId(userId);
    }

    public void deleteDatabase(Long dbId) {
        Database db = databaseRepository.findById(dbId)
                .orElseThrow(() -> new RuntimeException("DB not found"));

        runScript(
                "infra/scripts/postgres/revoke.sh",
                "postgres-"+db.getUsername(),
                "pgdata_" + db.getUsername()
        );

        databaseRepository.deleteById(dbId);
    }

    // ---- utility ----
    private void runScript(String script, String... args) {
        try {
            List<String> command = new ArrayList<>();
            command.add("bash");
            command.add(script);
            command.addAll(Arrays.asList(args));

            ProcessBuilder pb = new ProcessBuilder(command);
            pb.redirectErrorStream(true);
            Process process = pb.start();
            process.waitFor();

            if (process.exitValue() != 0) {
                throw new RuntimeException("Provisioning failed");
            }
        } catch (Exception e) {
            throw new RuntimeException("Script execution error", e);
        }
    }
}
