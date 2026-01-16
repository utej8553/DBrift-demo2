package org.utej.backend;

import org.springframework.stereotype.Service;

import java.util.*;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;


@Service
public class DatabaseService {
    private final DatabaseRepository databaseRepository;

    private final PortService portService;

public DatabaseService(DatabaseRepository databaseRepository,
                       PortService portService) {
    this.databaseRepository = databaseRepository;
    this.portService = portService;
}

    public Database createDatabase(CreateDatabaseRequest req) {

    int port = portService.allocatePort();   // 🔥 SAFE allocation

    String username = req.getDbName() + UUID.randomUUID().toString().substring(0, 6);
    String password = UUID.randomUUID().toString();

    try {
        runScript(
            "infra/scripts/postgres/create.sh",
            req.getDbName(),
            username,
            password,
            String.valueOf(port),
            req.getDbVersion()
        );
    } catch (Exception e) {
        portService.releasePort(port); // 🔁 rollback
        throw e;
    }

    Database db = new Database();
    db.setUserId(req.getUserId());
    db.setDbName(req.getDbName());
    db.setDescription(req.getDescription());
    db.setDbType(req.getDbType());
    db.setDbVersion(req.getDbVersion());
    db.setUsername(username);
    db.setPassword(password);
    db.setPort(port);
    db.setCreatedAt(new Date());

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
        "postgres-" + db.getUsername(),
        "pgdata_" + db.getUsername()
    );

    portService.releasePort(db.getPort()); // 🔓 free port
    databaseRepository.deleteById(dbId);
}


    // ---- utility ----
    private void runScript(String scriptPath, String... args) {
        try {
            // 1️⃣ Load script from resources
            var resource = getClass().getClassLoader().getResource(scriptPath);
            if (resource == null) {
                throw new RuntimeException("Script not found in resources: " + scriptPath);
            }

            // 2️⃣ Copy to temp file
            File tempScript = File.createTempFile("script-", ".sh");
            try (InputStream in = resource.openStream();
                 FileOutputStream out = new FileOutputStream(tempScript)) {
                in.transferTo(out);
            }

            // 3️⃣ Make executable
            tempScript.setExecutable(true);

            // 4️⃣ Build command
            List<String> command = new ArrayList<>();
            command.add("/bin/bash");
            command.add(tempScript.getAbsolutePath());
            command.addAll(Arrays.asList(args));

            ProcessBuilder pb = new ProcessBuilder(command);
            pb.redirectErrorStream(true);

            Process process = pb.start();

            try (Scanner scanner = new Scanner(process.getInputStream())) {
                while (scanner.hasNextLine()) {
                    System.out.println("[SCRIPT] " + scanner.nextLine());
                }
            }

            int exitCode = process.waitFor();
            System.out.println("Script exit code = " + exitCode);

            if (exitCode != 0) {
                throw new RuntimeException("Provisioning failed, exitCode=" + exitCode);
            }

        } catch (Exception e) {
            throw new RuntimeException("Script execution error", e);
        }
    }
}



