import React from "react";
import { Layout, Row, Col } from 'antd';
import { CartIcon, Logo } from "../../assets/images";
import "./index.scss";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {

    const location = useLocation();

 return ( <Layout className="navbar-container">
    <div className="logo">
        <img alt="logo" src={Logo} height={60} />
    </div>
    <div className="nav-menu">
        <Link className={`nav-menu-item ${location.pathname === '/'? 'active': ""}`} to={'/'}>
        Home
        </Link>
        <Link className={`nav-menu-item ${location.pathname === '/products'? 'active': ""}`} to={'/products'}>
        Products
        </Link>
    </div>
    <div>
        <Row>
            <Col className="auth-items">
                SignIn 
            </Col>
            <Col className="auth-items">
                Register
            </Col>
            <Row className="cart-icon">
                <img alt="cart-icon" src={CartIcon} height={30} />
                <span>0 items</span> 
            </Row>
        </Row>
    </div>
  </Layout>);
}
export default Navbar