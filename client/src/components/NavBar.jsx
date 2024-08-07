import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const NavBar = ({ onLogout }) => {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getRole();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    authService.logout();
    onLogout();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#f9faff",
        boxShadow: "none",
        padding: "0 20px",
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: "#e6f2ff",
        },
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: "#00274d",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#00274d",
            }}
          >
            Shopping Cart
          </Link>
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/products"
          sx={{
            color: "#003366",
            transition: "color 0.3s ease, transform 0.3s ease",
            "&:hover": {
              color: "#0056b3",
              transform: "scale(1.05)",
            },
          }}
        >
          Products
        </Button>
        {isAuthenticated && userRole === "ROLE_ADMIN" && (
          <Button
            color="inherit"
            component={Link}
            to="/admin/home"
            sx={{
              color: "#003366",
              transition: "color 0.3s ease, transform 0.3s ease",
              "&:hover": {
                color: "#0056b3",
                transform: "scale(1.05)",
              },
            }}
          >
            HOME
          </Button>
        )}
        {isAuthenticated && userRole === "ROLE_USER" && (
          <Button
            color="inherit"
            component={Link}
            to="/user/home"
            sx={{
              color: "#003366",
              transition: "color 0.3s ease, transform 0.3s ease",
              "&:hover": {
                color: "#0056b3",
                transform: "scale(1.05)",
              },
            }}
          >
            HOME
          </Button>
        )}
        {!isAuthenticated && (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{
                color: "#003366",
                transition: "color 0.3s ease, transform 0.3s ease",
                "&:hover": {
                  color: "#0056b3",
                  transform: "scale(1.05)",
                },
              }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/register"
              sx={{
                color: "#003366",
                transition: "color 0.3s ease, transform 0.3s ease",
                "&:hover": {
                  color: "#0056b3",
                  transform: "scale(1.05)",
                },
              }}
            >
              Register
            </Button>
          </>
        )}
        {isAuthenticated && (
          <>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                color: "#003366",
                transition: "color 0.3s ease, transform 0.3s ease",
                "&:hover": {
                  color: "#0056b3",
                  transform: "scale(1.05)",
                },
              }}
            >
              Logout
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/cart"
              sx={{
                color: "#003366",
                transition: "color 0.3s ease, transform 0.3s ease",
                "&:hover": {
                  color: "#0056b3",
                  transform: "scale(1.05)",
                },
              }}
            >
              Cart
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
