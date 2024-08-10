package project.aurora.auth.services.contracts;

import jakarta.servlet.http.Cookie;
import project.aurora.auth.models.User;

public interface IAuthService {
    String generateRefreshToken(User user);

    String generateAccessToken(User user);

    Cookie getSecuredCookie(String name, String value, String path, int expiry);

    boolean shouldRotateRefreshToken(String refreshToken);

    User getUserFromToken(String token);
}
