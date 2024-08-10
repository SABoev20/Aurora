package project.aurora.auth.services.contracts;

import jakarta.servlet.http.Cookie;

public interface IAuthService {
    String generateRefreshToken();

    String generateAccessToken();

    Cookie getSecuredCookie(String name, String value, String path, int expiry);
}
