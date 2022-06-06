import React from "react";
import { Layout } from 'antd';
import "./index.scss";

const { Footer } = Layout;

const CustomFooter = () => (
  <Layout className="footer-container">
   <Footer>Copyright © 2011-2018 Sabka Bazaar Grocery Supplies Pvt Ltd</Footer>
  </Layout>
)
export default CustomFooter