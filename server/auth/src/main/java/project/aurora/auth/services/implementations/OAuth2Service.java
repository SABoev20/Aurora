package project.aurora.auth.services.implementations;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import project.aurora.auth.config.OAuth2ClientConfig;
import project.aurora.auth.models.DTOs.user.UnifiedUserInfo;
import project.aurora.auth.models.DTOs.user.UserCreationDTO;
import project.aurora.auth.models.OAuth2Provider;
import project.aurora.auth.models.User;
import project.aurora.auth.models.constants.OAuth2Constants;
import project.aurora.auth.repositories.OAuth2ProviderRepository;
import project.aurora.auth.services.contracts.IAuthService;
import project.aurora.auth.services.contracts.IOAuth2Service;
import project.aurora.auth.services.contracts.IUserService;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import static project.aurora.auth.models.constants.OAuth2Constants.REDIRECT_URL;


@Service
public class OAuth2Service implements IOAuth2Service {

    private final OAuth2ClientConfig clientConfig;
    private final OAuth2ProviderRepository providerRepository;
    private final IAuthService authService;
    private final IUserService userService;

    public OAuth2Service(OAuth2ClientConfig clientConfig, OAuth2ProviderRepository providerRepository, IAuthService authService ,IUserService userService) {
        this.clientConfig = clientConfig;
        this.providerRepository = providerRepository;
        this.authService = authService;
        this.userService = userService;
    }

    @Override
    public void processOAuth2Callback(String code, String provider, HttpServletRequest request, HttpServletResponse response) {
        //1) exchange the code from the callback for an access token for getting the user info from the provider
        String accessToken = exchangeCodeForAccessToken(code, provider);

        //2) fetching the user info from the provider
        Map<String, Object> userInfo = fetchUserInfo(accessToken, provider);

        //3) mapping the fetched user to a DTO for easier use
        UnifiedUserInfo unifiedUserInfo = mapUserInfo(userInfo, provider);

        //4) check if a provider already exists
        Optional<OAuth2Provider> optionalProvider = Optional.ofNullable(providerRepository.findByProviderNameAndProvidedUserId(provider, unifiedUserInfo.getUserId()));
        if (optionalProvider.isPresent()) {
            // login
            authService.signUserIn(optionalProvider.get().getUser(), request, response);
        }
        else {
            //check if user already exists
            Optional<User> optionalUser = Optional.ofNullable(userService.findUserByEmail(unifiedUserInfo.getEmail()));
            if (optionalUser.isPresent()) {
                // add the provider as an option
                providerRepository.save(new OAuth2Provider(null, optionalUser.get(), provider, unifiedUserInfo.getUserId()));
                // login
                authService.signUserIn(optionalUser.get(), request, response);
            }
            else{
                User user = userService.createUser(unifiedUserInfo.getEmail(), null, "LISTENER");
                providerRepository.save(new OAuth2Provider(null, user, provider, unifiedUserInfo.getUserId()));
                UserCreationDTO userCreationDTO = new UserCreationDTO(unifiedUserInfo.getName(), unifiedUserInfo.getProfilePicture(), null);
                authService.signUserUp(user, userCreationDTO, request, response);
            }
        }

        // Process the user info (e.g., create or find the user in your database)
    }

    private String exchangeCodeForAccessToken(String code, String provider) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        Map<String, String> body = Map.of(
                "client_id", clientConfig.getClientId(provider),
                "client_secret", clientConfig.getClientSecret(provider),
                "code", code,
                "redirect_uri", REDIRECT_URL + provider,
                "grant_type", "authorization_code"
        );

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(OAuth2Constants.TOKEN_URLS.get(provider), requestEntity, String.class);

        return extractAccessToken(Objects.requireNonNull(response.getBody()));
    }

    private Map<String, Object> fetchUserInfo(String accessToken, String provider) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                OAuth2Constants.USER_INFO_URLS.get(provider),
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );

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


    private UnifiedUserInfo mapUserInfo(Map<String, Object> userInfo, String provider) {
        UnifiedUserInfo unifiedUserInfo = new UnifiedUserInfo();

        unifiedUserInfo.setUserId(getStringFromMap(userInfo, "id", provider));
        unifiedUserInfo.setName(getStringFromMap(userInfo, provider.equalsIgnoreCase("discord") ? "username" : "name", provider));
        unifiedUserInfo.setEmail((String) userInfo.get("email"));

        switch (provider.toLowerCase()) {
            case "github":
                unifiedUserInfo.setProfilePicture((String) userInfo.get("avatar_url"));
                break;
            case "google":
                unifiedUserInfo.setProfilePicture((String) userInfo.get("picture"));
                break;
            case "discord":
                String avatarUrl = "https://cdn.discordapp.com/avatars/" + userInfo.get("id") + "/" + userInfo.get("avatar") + ".png";
                unifiedUserInfo.setProfilePicture(avatarUrl);
                break;
            default:
                throw new IllegalArgumentException("Unsupported provider: " + provider);
        }

        return unifiedUserInfo;
    }

    private String getStringFromMap(Map<String, Object> map, String key, String provider) {
        Object value = map.get(key);
        if (value == null) {
            throw new IllegalArgumentException("Missing required field '" + key + "' for provider " + provider);
        }
        return value.toString();
    }
}
