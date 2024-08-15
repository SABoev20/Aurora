package project.aurora.auth.services.implementations;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import project.aurora.auth.services.contracts.IOAuth2Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class OAuth2Service implements IOAuth2Service {
    private static final String GITHUB_OAUTH_PREFIX = "spring.security.oauth2.client.registration.github.";

    @Value("${" + GITHUB_OAUTH_PREFIX + "client-id}")
    private String clientId;

    @Value("${" + GITHUB_OAUTH_PREFIX + "client-secret}")
    private String clientSecret;

    @Override
    public void processOAuth2Callback(String code, String provider, HttpServletResponse response) {
        String accessToken = exchangeCodeForAccessToken(code, provider);

        Map<String, Object> userInfo = fetchUserInfo(accessToken);

        // 3. Process the user info (e.g., create or find the user in your database)

    }

    private String exchangeCodeForAccessToken(String code, String provider) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        Map<String, String> body = new HashMap<>();
        body.put("client_id", clientId);
        body.put("client_secret", clientSecret);
        body.put("code", code);
        body.put("redirect_uri", "http://localhost:5173/oauth2/callback");

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity("https://github.com/login/oauth/access_token", requestEntity, String.class);

        // Extract the access token from the response
        return extractAccessToken(response.getBody());
    }

    private Map<String, Object> fetchUserInfo(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<Map> response = restTemplate.exchange("https://api.github.com/user", HttpMethod.GET, entity, Map.class);

        return response.getBody();
    }

    private String extractAccessToken(String responseBody) {
        String[] tokens = responseBody.split("&");
        for (String token : tokens) {
            if (token.startsWith("access_token=")) {
                return token.split("=")[1];
            }
        }
        throw new RuntimeException("Failed to extract access token");
    }
}
