package project.aurora.auth.services.implementations;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.aurora.auth.exceptions.AuthenticationDeniedException;
import project.aurora.auth.exceptions.InvalidCredentialsException;
import project.aurora.auth.models.DTOs.user.UserRegistrationDTO;
import project.aurora.auth.models.User;
import project.aurora.auth.repositories.UserRepository;
import project.aurora.auth.services.contracts.IUserService;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User authenticateUser(String email, String password) {
        Optional<User> optionalUser = Optional.ofNullable(userRepository.findByEmail(email));
        if(optionalUser.isEmpty()) throw new AuthenticationDeniedException("This email address is not linked to an account");
        if(!passwordEncoder.matches(password, optionalUser.get().getPassword())) throw new AuthenticationDeniedException("Incorrect password");
        return optionalUser.get();
    }

    @Override
    public User findUserById(String uuid) {
        return userRepository.findByUserId(UUID.fromString(uuid));
    }

    @Override
    public User registerUser(UserRegistrationDTO userRegistrationDTO) {
        return null;
    }
}
