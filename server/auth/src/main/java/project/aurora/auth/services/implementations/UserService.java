package project.aurora.auth.services.implementations;

import org.springframework.stereotype.Service;
import project.aurora.auth.models.User;
import project.aurora.auth.repositories.UserRepository;
import project.aurora.auth.services.contracts.IUserService;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements IUserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public User authenticateUser(String email, String password) {
        Optional<User> optionalUser = Optional.ofNullable(userRepository.findByEmail(email));
        return null;
    }

    @Override
    public User findUserById(String uuid) {
        return userRepository.findByUserId(UUID.fromString(uuid));
    }
}
