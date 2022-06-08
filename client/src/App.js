import './App.css';
import Navbar from './components/Navbar';
import CustomFooter from './components/CustomFooter';
import Home from './container/Home';
import Products from './container/Products';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Layout } from 'antd';
import Store from './store';
import Login from './container/Login';
import Register from './container/Register';

function App() {
  return (
    <div className="App">
      <Store>
      <BrowserRouter>
     <Navbar />
     <Layout className="main-container">
     <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<Products />} />
      </Routes>
     </Layout>
     <CustomFooter />
     </BrowserRouter>
     </Store>
    </div>
  );
}

export default App;
