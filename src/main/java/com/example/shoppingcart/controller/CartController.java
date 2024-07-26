package com.example.shoppingcart.controller;

import java.security.Principal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.shoppingcart.model.Cart;
import com.example.shoppingcart.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin
public class CartController {

    @Autowired
    private CartService cartService;

     @PostMapping
    public ResponseEntity<Cart> addToCart(@RequestBody Map<String, Long> payload, Principal principal) {
        String username = principal.getName();
        Long productId = payload.get("productId");
        Cart cart = cartService.addToCart(username, productId);
        return ResponseEntity.ok(cart);
    }

    @GetMapping
    public ResponseEntity<Cart> getCart(Principal principal) {
        String username = principal.getName();
        Cart cart = cartService.getCartByUser(username);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long productId, Principal principal) {
        String username = principal.getName();
        cartService.removeFromCart(username, productId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/checkout")
    public ResponseEntity<Void> checkout() {
        cartService.checkout();
        return ResponseEntity.ok().build();
    }
}
