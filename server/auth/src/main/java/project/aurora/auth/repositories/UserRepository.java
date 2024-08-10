package project.aurora.auth.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.aurora.auth.models.User;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    User findByUserId(UUID uuid);
}
