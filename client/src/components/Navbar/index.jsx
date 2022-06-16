import React, { useContext, useState } from "react";
import { Row } from "antd";
import { CartIcon, Logo } from "../../assets/images";
import "./index.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../store";
import CartDetails from "../CartDetails";
import CustomButton from "../CustomButton";

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
          <CustomButton 
          type="text"
          className="auth-items" 
          onClickHandler={() => {
            navigate("/login");
          }}
          testId="login"
          label="SignIn Button"
        > 
         SignIn
        </CustomButton>
        <CustomButton 
          type="text"
          className="auth-items" 
          onClickHandler={() => {
            navigate("/register");
          }}
          testId="register"
          label="Register Button"
        > 
         Register
        </CustomButton>
        <CustomButton 
          type="text"
          className="cart-icon" 
          onClickHandler={() => setVisible(true)}
          testId="cart-icon"
          label={`${state?.cartDetails?.length} items in cart Button`}
        > 
          <img alt="Cart icon" src={CartIcon} height={30} />
          <span>{`${state?.cartDetails?.length} items`}</span>
        </CustomButton>
        </Row>
      </div>
      <CartDetails visible={visible} setVisible={setVisible} />
    </nav>
  );
};
export default Navbar;
