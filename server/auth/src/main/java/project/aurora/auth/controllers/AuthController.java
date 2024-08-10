package project.aurora.auth.controllers;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;
import project.aurora.auth.exceptions.ReauthenticationRequiredException;
import project.aurora.auth.models.DTOs.auth.LoginRequestDTO;
import project.aurora.auth.models.DTOs.user.UserRegistrationDTO;
import project.aurora.auth.models.User;
import project.aurora.auth.services.contracts.IAuthService;
import project.aurora.auth.services.contracts.IDeviceService;
import project.aurora.auth.services.contracts.IUserService;

import java.util.UUID;

import static project.aurora.auth.models.constants.TimeConstants.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final IUserService userService;
    private final IDeviceService deviceService;
    private final IAuthService authService;

    public AuthController(IUserService userService, IDeviceService deviceService, IAuthService authService){
        this.userService = userService;
        this.deviceService = deviceService;
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest,
                                   HttpServletRequest request,
                                   HttpServletResponse response) {

        User user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());

        Cookie deviceCookie = WebUtils.getCookie(request, "device_id");
        String deviceId;
        if (deviceCookie == null) {
            deviceId = UUID.randomUUID().toString();
            deviceService.registerNewDevice(user, deviceId, request);

            response.addCookie(authService.getSecuredCookie("device_id", deviceId, "/", DEVICE_EXPIRY));
        } else {
            deviceId = deviceCookie.getValue();
            deviceService.updateDeviceLastUsed(deviceId);
        }

        String refreshToken = authService.generateRefreshToken(user);
        String accessToken = authService.generateAccessToken(user);
        deviceService.assignRefreshTokenToDevice(user, deviceId, refreshToken);

        response.addCookie(authService.getSecuredCookie("refresh-token", refreshToken, "/api/auth/refresh", REFRESH_TOKEN_EXPIRY));
        response.addCookie(authService.getSecuredCookie("access-token", accessToken, "/", ACCESS_TOKEN_EXPIRY));

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
        Cookie deviceCookie = WebUtils.getCookie(request, "device_id");
        if (deviceCookie == null) throw new ReauthenticationRequiredException("Device cookie is missing.");
        String deviceId = deviceCookie.getValue();

        Cookie refreshTokenCookie = WebUtils.getCookie(request, "refresh-token");
        if (refreshTokenCookie == null) throw new ReauthenticationRequiredException("Refresh-token cookie is missing.");
        String refreshToken = refreshTokenCookie.getValue();

        deviceService.verifyTokenMatchesDevice(deviceId, refreshToken);
        User user = authService.getUserFromToken(refreshToken);

        if(authService.shouldRotateRefreshToken(refreshToken)){
            String newRefreshToken = authService.generateRefreshToken(user);
            deviceService.assignRefreshTokenToDevice(user, deviceId, newRefreshToken);
            response.addCookie(authService.getSecuredCookie("refresh-token", newRefreshToken, "/api/auth/refresh", REFRESH_TOKEN_EXPIRY));
        }

        String accessToken = authService.generateAccessToken(user);
        response.addCookie(authService.getSecuredCookie("access-token", accessToken, "/", ACCESS_TOKEN_EXPIRY));

        return ResponseEntity.ok().build();
    }
}