package project.aurora.auth.controllers;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;
import project.aurora.auth.exceptions.InvalidCredentialsException;
import project.aurora.auth.exceptions.ReauthenticationRequiredException;
import project.aurora.auth.models.DTOs.auth.LoginRequestDTO;
import project.aurora.auth.models.DTOs.user.UserRegistrationDTO;
import project.aurora.auth.models.User;
import project.aurora.auth.models.constants.PathConstants;
import project.aurora.auth.services.contracts.*;

import static project.aurora.auth.exceptions.InvalidCredentialsException.CredentialType.COOKIE;
import static project.aurora.auth.models.constants.NameConstants.*;
import static project.aurora.auth.models.constants.PathConstants.*;
import static project.aurora.auth.models.constants.TimeConstants.*;

@RestController
@RequestMapping(PathConstants.AUTH_MAPPING_PATH)
public class AuthController {
    private final IUserService userService;
    private final IAuthService authService;

    public AuthController(IUserService userService, IAuthService authService){
        this.userService = userService;
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest, HttpServletRequest request, HttpServletResponse response) {
        User user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
        authService.signUserIn(user, request, response);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegistrationDTO loginRequest, HttpServletRequest request, HttpServletResponse response) {
        return ResponseEntity.ok().build();
    }
}