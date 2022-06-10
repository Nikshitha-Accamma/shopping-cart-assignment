import React, { useContext, useEffect, useState } from "react";
import { Drawer, Button, Tooltip } from "antd";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store";
import { CloseOutlined } from "@ant-design/icons";

const CartDetails = ({visible, setVisible}) => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);
  const [cartList, setCartList] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (state?.cartDetails?.length) {
      let newArrayDetails = [];
      let totalcartPrice = 0;
      state?.cartDetails?.forEach((item) => {
        const index = newArrayDetails.findIndex((object) => {
          return object.id === item.id;
        });
        if (index >= 0) {
          newArrayDetails[index] = {
            ...item,
            qty: newArrayDetails[index]?.qty + 1,
          };
        } else {
          newArrayDetails.push({
            ...item,
            qty: 1,
          });
        }
        totalcartPrice += item?.price;
      });
      setCartList(newArrayDetails);
      setCartPrice(totalcartPrice);
    }
  }, [state?.cartDetails]);

  const increaseQty = (item) => {
    let newList = [...cartList];
    const index = newList.findIndex((object) => {
      return object.id === item.id;
    });
    newList[index].qty = newList[index]?.qty + 1;
    setCartList(newList);
    const newArrayList = [...state?.cartDetails];
    newArrayList.push(item);
    dispatch({ type: "UPDATE_CART_VALUE", payload: newArrayList });
  };

  const decreaseQty = (item) => {
    const newList = [...cartList];
    const index = newList.findIndex((object) => {
      return object.id === item.id;
    });
    if (newList[index].qty - 1) {
      newList[index].qty = newList[index]?.qty - 1;
    } else {
      newList.splice(index, 1);
    }
    setCartList(newList);
    const newArrayList = [...state?.cartDetails];
    const globalIndex = newArrayList.findIndex((object) => {
      return object.id === item.id;
    });
    newArrayList.splice(globalIndex, 1);
    dispatch({ type: "UPDATE_CART_VALUE", payload: newArrayList });
  };

  return (
    <Drawer
      title={`My Cart (${state?.cartDetails?.length} items)`}
      placement="right"
      onClose={onClose}
      visible={visible}
      footer={
        cartList?.length ? (
          <div className="pay-footer">
            Promo code can be applied on the payment page
            <div>
              <Button
                className="pay-btn"
                data-testid="pay-btn"
                onClick={() => setVisible(false)}
                aria-label={`Rs.${cartPrice} Proceed to checkout`}
              >
                <span>Proceed to checkout</span>
                <span>{`Rs.${cartPrice} >`}</span>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Button
              className="start-shop-btn"
              data-testid="start-shop-btn"
              onClick={() => {
                setVisible(false);
                navigate("/products");
              }}
            >
              Start Shopping
            </Button>
          </div>
        )
      }
      className={`cart-drawer ${cartList?.length ? "add-bg" : ""}`}
      aria-label="My Cart Drawer"
    >
      {cartList?.length ? (
        <div>
          {cartList?.map((item) => {
            return (
              <div
                key={item?.id}
                className="cart-disp-card"
                tabIndex="0"
                aria-label={`${item?.name} ${item?.qty} quantities`}
              >
                <div>
                  <img
                    className="cart-disp-card-img"
                    src={item?.imageURL}
                    alt={item?.name}
                  />
                </div>
                <div className="cart-disp-card-body">
                  <div className="cart-disp-card-body-title">
                    <Tooltip title={item?.name}>{item?.name}</Tooltip>
                  </div>
                  <div className="cart-disp-card-body-sub">
                    <div>
                      <Button
                        type="text"
                        className="cart-disp-card-body-minus"
                        onClick={() => decreaseQty(item)}
                        aria-label="decrease quantity"
                      >
                        -
                      </Button>
                      <span data-testid="qty">{item?.qty}</span>
                      <Button
                        type="text"
                        className="cart-disp-card-body-plus"
                        onClick={() => increaseQty(item)}
                        aria-label="increase quantity"
                      >
                        +
                      </Button>
                      <span>
                        <CloseOutlined className="mul-icon" />
                        {`Rs.${item?.price}`}
                      </span>
                    </div>
                    <div className="text-align-right">
                      Rs.{item?.price * item?.qty}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="gaurentee-card">
            <img alt="Lowest Price Guaranteed" src="/images/lowest-price.png" />
            You won't find it cheaper anywhere
          </div>
        </div>
      ) : (
        <div
          className="empty-content"
          tabIndex="0"
          aria-label="No items in your cart"
        >
          <p className="empty-content-title">No items in your cart</p>
          <p className="empty-content-body">
            Your favourite items are just a click away{" "}
          </p>
        </div>
      )}
    </Drawer>
  );
};
export default CartDetails;
