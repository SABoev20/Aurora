package project.aurora.auth.services.contracts;

import project.aurora.auth.models.User;

public interface IUserService {
    User authenticateUser(String email, String password);

    User findUserById(String uuid);
}
