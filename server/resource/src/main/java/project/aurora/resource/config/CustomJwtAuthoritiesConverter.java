package project.aurora.resource.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import java.util.Collection;

public class CustomJwtAuthoritiesConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    private final JwtGrantedAuthoritiesConverter defaultGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();

    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        defaultGrantedAuthoritiesConverter.setAuthoritiesClaimName("role");
        defaultGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");
        return defaultGrantedAuthoritiesConverter.convert(jwt);
    }
}