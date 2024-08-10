package project.aurora.auth.services.implementations;

import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Service;
import project.aurora.auth.services.contracts.IAuthService;

@Service
public class AuthService implements IAuthService {
    @Override
    public String generateRefreshToken() {
        return null;
    }

    @Override
    public String generateAccessToken() {
        return null;
    }

    @Override
    public Cookie getSecuredCookie(String name, String value, String path, int expiry) {
        Cookie cookie = new Cookie(name, value);
        cookie.setPath(path);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge(expiry);
        return cookie;
    }


}
