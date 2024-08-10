package project.aurora.auth.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.aurora.auth.models.Device;

import java.util.UUID;

public interface DeviceRepository extends JpaRepository<Device, UUID> {
}
