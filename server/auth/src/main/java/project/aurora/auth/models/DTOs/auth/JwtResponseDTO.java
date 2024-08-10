package project.aurora.auth.models.DTOs.auth;

import lombok.Value;

@Value
public class JwtResponseDTO {
    String accessToken;
    String refreshToken;
}
