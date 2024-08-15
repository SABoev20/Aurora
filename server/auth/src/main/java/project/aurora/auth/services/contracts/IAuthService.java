package project.aurora.auth.services.contracts;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import project.aurora.auth.models.User;

public interface IAuthService {
    void signUserIn(User user, HttpServletRequest request, HttpServletResponse response);
}
