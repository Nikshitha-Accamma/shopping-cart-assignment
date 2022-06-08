import { Button, Card, Col, Dropdown, Empty, Layout, Menu, Row, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import AppNotification from '../../components/AppNotification';
import './index.scss';
import { Context } from '../../store';
import { useLocation } from 'react-router-dom';

const { Content, Sider } = Layout;

const Products = () => {
    
    const [products, setProductsList] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState("");
    const [state, dispatch] = useContext(Context);
    const location = useLocation();

    useEffect(()=>{
        fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(
        (result) => {
            setProductsList(result);
            if(location?.state){
                const newFilteredProducts =  result.filter(el => el?.category === location?.state);
                setFilteredProducts(newFilteredProducts);
            }else{
                setFilteredProducts(result);
            }
        },
        () => {
         AppNotification('error', 'Products', 'Error while fetching Products')
        }
      );
      fetch("http://localhost:3000/categories")
      .then(res => res.json())
      .then(
        (result) => {
            const categoryList = result.map(item => ({
                key: item?.id,
                label: item?.name,
              }));
            setCategories(categoryList)
            location?.state ?
            setSelectedMenu(categoryList.filter(el => el?.key === location?.state)[0]?.label): setSelectedMenu("")
        },
        () => {
         AppNotification('error', 'Categories', 'Error while fetching categories')
        }
      );
    },[]);


    const handleMenuClick = (item) => {
        if(selectedMenu && selectedMenu === item?.label) {
            setSelectedMenu("");
            setFilteredProducts(products);
        }
        else {
            setSelectedMenu(categories.filter(el => el?.key === item?.key)[0]?.label)
            const newFilteredProducts =  products.filter(el => el?.category === item?.key);
            setFilteredProducts(newFilteredProducts);
        }
    }

    const menu = (
        <Menu
          onClick={handleMenuClick}
          items={categories}
        />
      );

    const addToCart = (item) => {
        fetch("http://localhost:3000/addTOCart", { method: 'POST', body: JSON.stringify({ id: item?.id }) })
        .then(res => res.json())
        .then(
          (result) => {
              AppNotification('success', 'Cart', 'Successfully added to cart');
              const newData = state?.cartDetails?.length ? [...state?.cartDetails, item]: [item];
              dispatch({type: 'UPDATE_CART_VALUE', payload: newData})
          },
          () => {
             AppNotification('error', 'Cart', 'Error while adding to cart');
          }
        );
    }

    return (
        <Layout className="products-container">
            <Sider className="category-list" width={200}>
                {
                    categories?.map(item => {
                        return <div className={`menu-item ${selectedMenu===item?.label? "active": ""}`} key={item?.key} onClick={()=> handleMenuClick(item) }>{item?.label}</div>
                    })
                }
            </Sider>
            <Content>
                <div className="category-dropdown">
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Space>
                            {
                                selectedMenu? selectedMenu: 'All'
                            }
                        <DownOutlined />
                        </Space>
                    </Dropdown>
                </div>
                <Row className="card-display-container">
                    {
                       filteredProducts.length ? filteredProducts.map(item=>{
                            return (
                            <Col sm={16} md={12} lg={6} key={item.id} className="product-card">
                                <Card key={item.id} bordered={false}>
                                    <div className="card-rows">
                                        <div className="card-title">
                                        {
                                            item.name
                                        }
                                        </div>
                                        <div className="card-desc-img">
                                            <div>
                                            <img className="product-img" alt={item.name} src={item.imageURL} />
                                            </div>
                                            <div className="card-body">
                                            {
                                                item.description
                                            }
                                            </div>
                                        </div>
                                        <div className="pricing-card">
                                            <div className="price-val">
                                            {
                                                `MRP Rs.${item.price}`
                                            }
                                            </div>
                                            <div>
                                                <Button  className="card-btn" onClick={()=>addToCart(item)}>
                                                <span>
                                                    Buy Now <span className="item-price-sm-md">{`@ Rs.${item.price}`}</span>
                                                </span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            )
                        }): <Empty description="No products available"/>
                    }
                </Row>
            </Content>
       </Layout>
    )
}
export default  Products;