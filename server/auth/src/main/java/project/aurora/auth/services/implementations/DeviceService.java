package project.aurora.auth.services.implementations;

import org.springframework.security.crypto.password.PasswordEncoder;
import project.aurora.auth.exceptions.EntityNotFoundException;
import project.aurora.auth.exceptions.ReauthenticationRequiredException;
import project.aurora.auth.models.Device;
import project.aurora.auth.models.User;
import org.springframework.stereotype.Service;
import project.aurora.auth.repositories.DeviceRepository;
import project.aurora.auth.services.contracts.IAuthService;
import project.aurora.auth.services.contracts.IDeviceService;
import jakarta.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.UUID;

@Service
public class DeviceService implements IDeviceService {

    private final PasswordEncoder passwordEncoder;
    private final DeviceRepository deviceRepository;

    public DeviceService(PasswordEncoder passwordEncoder, DeviceRepository deviceRepository){
        this.passwordEncoder = passwordEncoder;
        this.deviceRepository = deviceRepository;
    }

    @Override
    public void registerNewDevice(User user, String deviceId, HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");

        // Extract device info from User-Agent header
        String browserName = extractBrowserName(userAgent);
        String operatingSystem = extractOperatingSystem(userAgent);
        String deviceType = determineDeviceType(userAgent);

        Device device = new Device();
        device.setDeviceId(UUID.fromString(deviceId));
        device.setUser(user);
        device.setBrowserName(browserName);
        device.setOperatingSystem(operatingSystem);
        device.setDeviceType(deviceType);
        deviceRepository.save(device);
    }

    public void updateDeviceLastUsed(String deviceId) {
        Device device = deviceRepository.findById(UUID.fromString(deviceId)).orElseThrow(() ->  new EntityNotFoundException("Device", deviceId));
        device.setLastUsed(Instant.now());
        deviceRepository.save(device);
    }

    public void assignRefreshTokenToDevice(User user, String deviceId, String refreshToken) {
        Device device = deviceRepository.findById(UUID.fromString(deviceId)).orElseThrow(() -> new EntityNotFoundException("Device", deviceId));
        device.setRefreshToken(passwordEncoder.encode(refreshToken));
        deviceRepository.save(device);
    }

    public void verifyTokenMatchesDevice(String deviceId, String refreshToken){
        Device device = deviceRepository.findById(UUID.fromString(deviceId)).orElseThrow(() -> new EntityNotFoundException("Device", deviceId));
        if(!passwordEncoder.matches(refreshToken, device.getRefreshToken())) throw new ReauthenticationRequiredException("Refresh token doesn't match with record");
    }

    // Methods for extracting information
    private String extractBrowserName(String userAgent) {
        if (userAgent.contains("Chrome")) return "Chrome";
        if (userAgent.contains("Firefox")) return "Firefox";
        return "Unknown";
    }

    private String extractOperatingSystem(String userAgent) {
        if (userAgent.contains("Windows")) return "Windows";
        if (userAgent.contains("Mac")) return "MacOS";
        if (userAgent.contains("Linux")) return "Linux";
        return "Unknown";
    }

    private String determineDeviceType(String userAgent) {
        if (userAgent.contains("Mobi")) return "Mobile";
        return "Desktop";
    }
}
