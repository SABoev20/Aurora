package project.aurora.auth.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class OAuth2ClientConfig {

    @Value("${spring.security.oauth2.client.registration.github.client-id}")
    private String githubClientId;

    @Value("${spring.security.oauth2.client.registration.github.client-secret}")
    private String githubClientSecret;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;

    @Value("${spring.security.oauth2.client.registration.discord.client-id}")
    private String discordClientId;

    @Value("${spring.security.oauth2.client.registration.discord.client-secret}")
    private String discordClientSecret;

    public String getClientId(String provider) {
        return switch (provider.toLowerCase()) {
            case "github" -> githubClientId;
            case "google" -> googleClientId;
            case "discord" -> discordClientId;
            default -> throw new IllegalArgumentException("Unsupported provider: " + provider);
        };
    }

    public String getClientSecret(String provider) {
        return switch (provider.toLowerCase()) {
            case "github" -> githubClientSecret;
            case "google" -> googleClientSecret;
            case "discord" -> discordClientSecret;
            default -> throw new IllegalArgumentException("Unsupported provider: " + provider);
        };
    }
}