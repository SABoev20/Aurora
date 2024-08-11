package project.aurora.resource.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@Component
public class JwtTokenCookieFilter extends OncePerRequestFilter {

    private static final String COOKIE_NAME = "access-token";

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    @NotNull HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        Optional<Cookie> accessTokenCookie = Arrays.stream(Optional.ofNullable(request.getCookies()).orElse(new Cookie[0]))
                .filter(cookie -> COOKIE_NAME.equals(cookie.getName()))
                .findFirst();

        accessTokenCookie.ifPresent(cookie -> {
            String token = cookie.getValue();
            if (token != null && !token.isEmpty()) {
                request.setAttribute("Authorization", "Bearer " + token);
            }
        });

        filterChain.doFilter(request, response);
    }
}