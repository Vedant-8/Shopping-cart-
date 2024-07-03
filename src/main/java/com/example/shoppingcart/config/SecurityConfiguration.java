package com.example.shoppingcart.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.example.shoppingcart.service.MyUserDetailService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    private MyUserDetailService userDetailService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        return httpSecurity
                .csrf(HttpsSecurityCsrfConfigurer -> HttpsSecurityCsrfConfigurer.disable())
                .authorizeHttpRequests(registry -> {
                   registry.requestMatchers("/home", "/register/**", "/api/auth/**", "/api/public/**", "/ws/**").permitAll();
                   registry.requestMatchers("/admin/**", "/api/admin/**").hasRole("ADMIN");
                   registry.requestMatchers("/user/**", "/profile", "/orders/**", "/products/**", "/api/user/**").hasRole("USER");
                   registry.anyRequest().authenticated();
                })
                .formLogin(httpSecurityFormLoginConfigurer -> {
                    httpSecurityFormLoginConfigurer
                                    .loginPage("/login")
                                    .successHandler(new AuthenticationSuccessHandler())
                                    .permitAll();
                })
                .build();
    }

    // @Bean  --> This was for in memory user service 
    // public UserDetailsService userDetailsService() {
    //     UserDetails normalUser = User.builder()
    //             .username("user")
    //             .password("$2a$12$0JBzvISVqt784mEVDVa1gexnte/05jwB24EM4N3NEchBHhyUBaYGC")
    //             .roles("USER")
    //             .build();
    //     UserDetails adminUser = User.builder()
    //             .username("admin")
    //             .password("$2a$12$Dx0j.OSL7HclKsbu4fiMKeJfnV2q7cAWJravhTW45f0ngkN5/aokq")
    //             .roles("ADMIN", "USER")
    //             .build();
    //     return new InMemoryUserDetailsManager(normalUser, adminUser);
    // }

    // For database user details --> 
    @Bean
    public UserDetailsService userDetailsService(){
        return userDetailService;
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
