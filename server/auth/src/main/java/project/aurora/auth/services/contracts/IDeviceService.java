package project.aurora.auth.services.contracts;

import jakarta.servlet.http.HttpServletRequest;
import project.aurora.auth.models.User;

public interface IDeviceService {
    void assignRefreshTokenToDevice(User user, String deviceId, String refreshToken);
    void registerNewDevice(User user, String deviceId, HttpServletRequest request);
    void updateDeviceLastUsed(String deviceId);
}
