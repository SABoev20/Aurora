package project.aurora.auth.models.DTOs.user;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class UnifiedUserInfo {
    private String userId;
    private String name;
    private String email;
    private String profilePicture;
}
