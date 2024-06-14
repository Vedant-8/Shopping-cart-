package com.example.gateway_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class GatewayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayServiceApplication.class, args);
	}
	
	@Bean
        public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("admin-service", r -> r.path("/admin/**")
                        .uri("lb://admin-service"))
                .route("user-service", r -> r.path("/user/**")
                        .uri("lb://user-service"))
                .build();
    }
}
