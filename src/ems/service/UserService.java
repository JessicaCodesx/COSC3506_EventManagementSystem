package ems.service;
import java.util.HashMap;
import java.util.Map;

public class UserService {
    private final Map<String, String> userCredentials = new HashMap<>();

    public UserService() {
        //making a fake user database
        userCredentials.put("Admin", "admin123");
        userCredentials.put("Vendor1", "vendorpass");
        userCredentials.put("Client1", "clientpass");
    }

    public boolean login(String username, String password) {
        if (userCredentials.containsKey(username)) {
            return userCredentials.get(username).equals(password);
        }
        return false;

    }
}
