package com.example.shoppingcart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shoppingcart.model.Cart;
import com.example.shoppingcart.model.MyUser;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUser(MyUser user);
}
