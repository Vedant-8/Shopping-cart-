# Shopping Cart Application 🛒🛍️

This application hosts shopping cart.

## Features

- **User Authentication and Authorization**: Secure login and registration using spring security and JWT (JSON Web Tokens).
- **Shopping Cart**: Users can add products to their cart, view their cart, and manage their purchases.
- **Real-Time Notifications**: Kafka-powered messaging for real-time updates and notifications.
- **Responsive UI**: Clean and modern design using **Material-UI** and CSS for a polished user experience.

## Tech Stack

- **Backend**: Spring Boot, Hibernate, Kafka, JWT
- **Frontend**: React.js, Material-UI
- **Database**: MySQL
- **Messaging**: Kafka

## Scalability

The application is built with scalability in mind. The modular structure and use of Kafka for messaging allow for future enhancements and scalability across various microservices.

## Documentation and Diagrams

For a detailed overview of the application architecture, database schema, flowcharts, and more, check out the **Eraser.io** documentation:
[![Eraser.io Documentation](https://img.shields.io/badge/View-Documentation-blue)](https://app.eraser.io/workspace/3yF0PPj65E4A98RltBtW?origin=share)

## Screenshots

<img width="1115" alt="11" src="https://github.com/user-attachments/assets/4d8a538b-e080-44b5-9e83-702459b66027">
<img width="1103" alt="14" src="https://github.com/user-attachments/assets/bf00d56e-f213-4b33-9b15-ad58b2f8d46e">
<img width="1120" alt="15" src="https://github.com/user-attachments/assets/c1cd9421-04f1-4c79-90b4-31178c8a403b">
<img width="1102" alt="17" src="https://github.com/user-attachments/assets/562091ad-1799-448f-9200-f81003c17eaa">

## Getting Started

1. **Backend**: Run the Spring Boot application on `localhost:8080`.
2. **Frontend**: Run the React.js frontend on `localhost:3000`.

```bash
cd backend
./mvnw spring-boot:run
```

```bash
cd frontend
npm start
```

## Contributions

Feel free to fork this repository and submit pull requests for any improvements 😊.
