package project.aurora.auth.controllers;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;
import project.aurora.auth.exceptions.InvalidCredentialsException;
import project.aurora.auth.models.DTOs.auth.LoginRequestDTO;
import project.aurora.auth.models.DTOs.auth.OAuth2CallbackRequestDTO;
import project.aurora.auth.models.DTOs.user.UserRegistrationDTO;
import project.aurora.auth.models.User;
import project.aurora.auth.models.constants.PathConstants;
import project.aurora.auth.services.contracts.*;

import static project.aurora.auth.exceptions.InvalidCredentialsException.CredentialType.COOKIE;
import static project.aurora.auth.models.constants.NameConstants.*;
import static project.aurora.auth.models.constants.PathConstants.*;
import static project.aurora.auth.models.constants.TimeConstants.*;

@RestController
@RequestMapping(PathConstants.OAUTH2_MAPPING_PATH)
public class OAuth2Controller {
    private final IOAuth2Service oauth2Service;

    public OAuth2Controller(IOAuth2Service oauth2Service){
        this.oauth2Service = oauth2Service;
    }

    @PostMapping("/callback")
    public ResponseEntity<?> handleOAuth2Callback(@RequestBody OAuth2CallbackRequestDTO oauth2CallbackRequestDTO, HttpServletRequest request, HttpServletResponse response) {
        oauth2Service.processOAuth2Callback(oauth2CallbackRequestDTO.getCode(), oauth2CallbackRequestDTO.getProvider(), request, response);
        return ResponseEntity.ok().build();
    }
}