package project.aurora.auth.services.implementations;

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
    private final DeviceRepository deviceRepository;
    private final IAuthService authService;

    public DeviceService(DeviceRepository deviceRepository, IAuthService authService){
        this.deviceRepository = deviceRepository;
        this.authService = authService;
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
        Device device = deviceRepository.findById(UUID.fromString(deviceId)).orElseThrow(() -> new RuntimeException("Device not found"));
        device.setLastUsed(Instant.now());
        deviceRepository.save(device);
    }

    public void assignRefreshTokenToDevice(User user, String deviceId, String refreshToken) {
        Device device = deviceRepository.findById(UUID.fromString(deviceId)).orElseThrow(() -> new RuntimeException("Device not found"));
        device.setRefreshToken(refreshToken);
        deviceRepository.save(device);
    }

    // Methods for extracting information from the User-Agent
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
