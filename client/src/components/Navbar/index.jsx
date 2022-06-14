import React, { useContext, useState } from "react";
import { Layout, Row, Button } from "antd";
import { CartIcon, Logo } from "../../assets/images";
import "./index.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../store";
import CartDetails from "../CartDetails";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [state] = useContext(Context);
  const [visible, setVisible] = useState(false);

  return (
    <nav className="navbar-container">
      <div className="logo">
        <img alt="App logo" src={Logo} height={60} />
      </div>
      <div className="nav-menu">
        <Link
          className={`nav-menu-item ${
            location.pathname === "/" ? "active" : ""
          }`}
          to={"/"}
        >
          Home
        </Link>
        <Link
          className={`nav-menu-item ${
            location.pathname === "/products" ? "active" : ""
          }`}
          to={"/products"}
        >
          Products
        </Link>
      </div>
      <div>
        <Row>
          <Button
            type="text"
            className="auth-items"
            onClick={() => {
              navigate("/login");
            }}
            data-testid="login"
          >
            SignIn
          </Button>
          <Button
            type="text"
            className="auth-items"
            onClick={() => {
              navigate("/register");
            }}
            data-testid="register"
          >
            Register
          </Button>
          <Button
            type="text"
            className="cart-icon"
            onClick={() => setVisible(true)}
            data-testid="cart-icon"
          >
            <img alt="Cart icon" src={CartIcon} height={30} />
            <span>{`${state?.cartDetails?.length} items`}</span>
          </Button>
        </Row>
      </div>
      <CartDetails visible={visible} setVisible={setVisible} />
    </nav>
  );
};
export default Navbar;
