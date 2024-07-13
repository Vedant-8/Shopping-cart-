package com.example.shoppingcart.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shoppingcart.model.Cart;
import com.example.shoppingcart.model.MyUser;
import com.example.shoppingcart.model.Product;
import com.example.shoppingcart.repository.CartRepository;
import com.example.shoppingcart.repository.MyUserRepository;
import com.example.shoppingcart.repository.ProductRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MyUserRepository myUserRepository;

    public Cart addToCart(String username, Long productId) {
        Optional<MyUser> user = myUserRepository.findByUsername(username);
        Cart cart = cartRepository.findByUser(user.orElse(null));

        if (cart == null) {
            cart = new Cart();
            cart.setUser(user.orElse(null));
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        cart.getProducts().add(product);
        return cartRepository.save(cart);
    }

    public Cart getCartByUser(String username) {
        Optional<MyUser> user = myUserRepository.findByUsername(username);
        return cartRepository.findByUser(user.orElse(null));
    }

    public void removeFromCart(String username, Long productId) {
        Optional<MyUser> user = myUserRepository.findByUsername(username);
        Cart cart = cartRepository.findByUser(user.orElse(null));

        if (cart != null) {
            cart.getProducts().removeIf(product -> product.getId().equals(productId));
            cartRepository.save(cart);
        }
    }

    // Additional methods like checkout can be added here

    public void checkout() {
        // Assume user is authenticated and you have access to username
        String username = "username"; // Replace with actual authenticated user's username or retrieve dynamically
        Optional<MyUser> user = myUserRepository.findByUsername(username);
        Cart cart = cartRepository.findByUser(user.orElseThrow(() -> new RuntimeException("User not found")));

        // Implement checkout logic here, e.g., process payment, update inventory, etc.
        // For demonstration, clearing the cart
        cart.getProducts().clear();
        cartRepository.save(cart);
    }
}
