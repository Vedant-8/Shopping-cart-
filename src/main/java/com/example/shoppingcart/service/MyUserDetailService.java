package com.example.shoppingcart.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.shoppingcart.model.MyUser;
import com.example.shoppingcart.repository.MyUserRepository;

@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    private MyUserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<MyUser> user = repository.findByUsername(username);
        if (user.isPresent()) {
            MyUser userObj = user.get();
            return User.builder()
                .username(userObj.getUsername())
                .password(userObj.getPassword())
                .roles(getRoles(userObj))
                .build();
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

    private String[] getRoles(MyUser user) {
        if (user.getRole() == null) {
            return new String[]{"USER"};
        }
        return user.getRole().split(",");
    }

    public MyUser updateUserProfile(MyUser updatedUser) {
        MyUser user = repository.findById(updatedUser.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        user.setEmail(updatedUser.getEmail());
        user.setUsername(updatedUser.getUsername());
        user.setNumber(updatedUser.getNumber());
        return repository.save(user);
    }

    public MyUser getUserByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }
}
