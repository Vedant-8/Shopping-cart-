package com.example.shoppingcart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shoppingcart.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
