package com.example.shoppingcart.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shoppingcart.model.MyUser;


public interface MyUserRepository extends JpaRepository<MyUser, Long> {

    Optional<MyUser> findByUsername(String username);

    boolean existsByUsername(String username);
}
