package project.aurora.auth.controllers;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.WebUtils;
import project.aurora.auth.models.DTOs.auth.JwtResponseDTO;
import project.aurora.auth.models.DTOs.auth.LoginRequestDTO;
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

        String refreshToken = authService.generateRefreshToken();
        String accessToken = authService.generateAccessToken();
        deviceService.assignRefreshTokenToDevice(user, deviceId, refreshToken);

        response.addCookie(authService.getSecuredCookie("refresh-token", refreshToken, "/api/auth/refresh", REFRESH_TOKEN_EXPIRY));
        response.addCookie(authService.getSecuredCookie("access-token", accessToken, "/", ACCESS_TOKEN_EXPIRY));

        return ResponseEntity.ok().build();
    }
}