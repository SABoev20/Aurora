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
import project.aurora.auth.services.contracts.ICookieService;
import project.aurora.auth.services.contracts.ITokenService;
import project.aurora.auth.services.contracts.IDeviceService;
import project.aurora.auth.services.contracts.IUserService;

import static project.aurora.auth.exceptions.InvalidCredentialsException.CredentialType.COOKIE;
import static project.aurora.auth.models.constants.NameConstants.*;
import static project.aurora.auth.models.constants.PathConstants.*;
import static project.aurora.auth.models.constants.TimeConstants.*;

@RestController
@RequestMapping(PathConstants.AUTH_MAPPING_PATH)
public class AuthController {
    private final IUserService userService;
    private final IDeviceService deviceService;
    private final ITokenService authService;
    private final ICookieService cookieService;

    public AuthController(IUserService userService, IDeviceService deviceService, ITokenService authService, ICookieService cookieService){
        this.userService = userService;
        this.deviceService = deviceService;
        this.authService = authService;
        this.cookieService = cookieService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest,
                                   HttpServletRequest request,
                                   HttpServletResponse response) {

        User user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
        if(user == null){

        }

        Cookie deviceCookie = WebUtils.getCookie(request, DEVICE_COOKIE_NAME);
        if(deviceCookie != null && !deviceService.deviceMatches(deviceCookie.getValue(), user)){
            response.addCookie(cookieService.invalidateCookie(deviceCookie));
            throw new InvalidCredentialsException(COOKIE);
        }

        String deviceId;
        if (deviceCookie == null) {
            deviceId = deviceService.registerNewDevice(user, request).getDeviceId().toString();
            response.addCookie(cookieService.createSecuredCookie(DEVICE_COOKIE_NAME, deviceId, BASE_PATH, DEVICE_EXPIRY));
        } else {
            deviceId = deviceCookie.getValue();
            deviceService.updateDeviceLastUsed(deviceId);
        }

        String refreshToken = authService.generateRefreshToken(user);
        String accessToken = authService.generateAccessToken(user);
        deviceService.assignRefreshTokenToDevice(user, deviceId, refreshToken);

        response.addCookie(cookieService.createSecuredCookie(REFRESH_COOKIE_NAME, refreshToken, REFRESH_COOKIE_PATH, REFRESH_TOKEN_EXPIRY));
        response.addCookie(cookieService.createSecuredCookie(ACCESS_COOKIE_NAME, accessToken, BASE_PATH, ACCESS_TOKEN_EXPIRY));

        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegistrationDTO loginRequest,
                                   HttpServletRequest request,
                                   HttpServletResponse response) {


        return ResponseEntity.ok().build();
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request, HttpServletResponse response) {
        Cookie deviceCookie = WebUtils.getCookie(request, DEVICE_COOKIE_NAME);
        if (deviceCookie == null) throw new ReauthenticationRequiredException("Device cookie is missing");

        Cookie refreshTokenCookie = WebUtils.getCookie(request, REFRESH_COOKIE_NAME);
        if (refreshTokenCookie == null) throw new ReauthenticationRequiredException("Refresh token cookie is missing");

        String deviceId = deviceCookie.getValue();
        String refreshToken = refreshTokenCookie.getValue();
        if(!deviceService.deviceMatches(deviceId, refreshToken)) throw new ReauthenticationRequiredException("Refresh token does not match with record");

        User user = authService.getUserFromToken(refreshToken);
        if(!deviceService.deviceMatches(deviceId, user)){
            response.addCookie(cookieService.invalidateCookie(deviceCookie));
            throw new ReauthenticationRequiredException("Device does not belong to this user");
        }

        if(authService.shouldRotateRefreshToken(refreshToken)){
            String newRefreshToken = authService.generateRefreshToken(user);
            deviceService.assignRefreshTokenToDevice(user, deviceId, newRefreshToken);
            response.addCookie(cookieService.createSecuredCookie(REFRESH_COOKIE_NAME, newRefreshToken, REFRESH_COOKIE_PATH, REFRESH_TOKEN_EXPIRY));
        }

        String accessToken = authService.generateAccessToken(user);
        response.addCookie(cookieService.createSecuredCookie(ACCESS_COOKIE_NAME, accessToken, BASE_PATH, ACCESS_TOKEN_EXPIRY));

        return ResponseEntity.ok().build();
    }
}