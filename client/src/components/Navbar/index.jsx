import React, { useContext, useEffect, useState } from "react";
import { Layout, Row, Col, Drawer, Button } from 'antd';
import { CartIcon, Logo } from "../../assets/images";
import "./index.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../store";
import { CloseOutlined } from "@ant-design/icons";

const Navbar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [state, dispatch] = useContext(Context);
    const [visible, setVisible] = useState(false);
    const [cartList, setCartList] = useState([]);
    const [cartPrice, setCartPrice] = useState(0);

    const onClose = () => {
        setVisible(false);
    }

    useEffect(()=>{
        if(state?.cartDetails?.length) {
            let newArrayDetails = [];
            let totalcartPrice = 0;
            state?.cartDetails?.forEach((item)=>{
              const index = newArrayDetails.findIndex(object => {
                    return object.id === item.id;
                  });
                  if(index>=0) {
                    newArrayDetails[index] = {
                        id: item?.id,
                        imageURL: item?.imageURL,
                        name: item?.name,
                        price: item?.price,
                        qty: newArrayDetails[index]?.qty+1
                    }
                  }else {
                    newArrayDetails.push({
                        id: item?.id,
                        imageURL: item?.imageURL,
                        name: item?.name,
                        price: item?.price,
                        qty: 1
                    })
                  }
                  totalcartPrice+=item?.price;
            });
            setCartList(newArrayDetails);
            setCartPrice(totalcartPrice);
        }
    },[state?.cartDetails])

    const increaseQty = (item) => {
        let newList = [...cartList];
        const index = newList.findIndex(object => {
            return object.id === item.id;
          });
         newList[index].qty = newList[index]?.qty + 1;
         setCartList(newList);
         const newArrayList = [...state?.cartDetails]
         newArrayList.push(item);
         dispatch({type: 'UPDATE_CART_VALUE', payload: newArrayList})
    }

    const decreaseQty = (item) => {
        const newList = [...cartList];
        const index = newList.findIndex(object => {
            return object.id === item.id;
          });
        if(newList[index].qty - 1) {
            newList[index].qty = newList[index]?.qty - 1;
        } else {
            newList.splice(index,1);
        }
        setCartList(newList);
        const newArrayList = [...state?.cartDetails]
        const globalIndex = newArrayList.findIndex(object => {
            return object.id === item.id;
          });
        newArrayList.splice(globalIndex,1);
        dispatch({type: 'UPDATE_CART_VALUE', payload: newArrayList})
    }

    return ( 
    <Layout className="navbar-container">
        <div className="logo">
            <img alt="app-logo" src={Logo} height={60} />
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
                <Button type="text" className="auth-items" onClick={()=>{navigate('/login')}}>
                    SignIn 
                </Button>
                <Button type="text" className="auth-items" onClick={()=>{navigate('/register')}}>
                    Register
                </Button>
                <Row className="cart-icon" onClick={()=>setVisible(true)}>
                    <img alt="cart-icon" src={CartIcon} height={30} />
                    <span>{`${state?.cartDetails?.length} items`}</span> 
                </Row>
            </Row>
        </div>
        <Drawer 
            title={`My Cart (${state?.cartDetails?.length} items)`} 
            placement="right" 
            onClose={onClose}
            visible={visible}
            footer={ cartList?.length ?<div className="pay-footer">
                Promo code can be applied on the payment page
                <div>
                    <Button className="pay-btn" onClick={()=>setVisible(false)}>
                        <span>Proceed to checkout</span><span>{`Rs.${cartPrice} >`}</span>
                    </Button>
                </div>
            </div>:<div><Button className="start-shop-btn" onClick={()=>{setVisible(false);navigate('/products'); }}>
                        Start Shopping
                    </Button></div>}
            className={`cart-drawer ${cartList?.length?"add-bg":""}`}
            >
            {
                cartList?.length ? 
                <div>
                    {
                cartList?.map(item => {
                    return (<div key={item?.id} className="cart-disp-card">
                        <div>
                            <img className="cart-disp-card-img" src={item?.imageURL} alt={item?.name} />
                        </div>
                        <div className="cart-disp-card-body">
                            <div className="cart-disp-card-body-title">
                                {item?.name}
                            </div>
                            <div className="cart-disp-card-body-sub">
                                <div>
                                    <span className="cart-disp-card-body-minus" onClick={()=>decreaseQty(item)}>-</span>{item?.qty}<span className="cart-disp-card-body-plus" onClick={()=>increaseQty(item)}>+</span><span><CloseOutlined className="mul-icon"/>{`Rs.${item?.price}`}</span>
                                </div>
                                <div className="text-align-right">
                                    Rs.{item?.price*item?.qty}
                                </div>
                            </div>
                        </div>
                    </div>)
                })
            }
            <div className="gaurentee-card">
                <img alt="lowest price tag" src="/images/lowest-price.png"/> You won't find it cheaper anywhere
            </div>
            </div>
                : <div className="empty-content">
                    <div className="empty-content-title">No items in your cart</div>
                    <div className="empty-content-body">Your favourite items are just a click away </div>
                </div>
            }
        </Drawer>
    </Layout>
    );
}
export default Navbar