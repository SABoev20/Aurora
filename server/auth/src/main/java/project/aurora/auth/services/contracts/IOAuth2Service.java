package project.aurora.auth.services.contracts;

import jakarta.servlet.http.HttpServletResponse;

public interface IOAuth2Service {
    void processOAuth2Callback(String code, String provider, HttpServletResponse response);
}
