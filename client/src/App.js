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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
     <Navbar />
     <Layout className="main-container">
     <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<Products />} />
      </Routes>
     </Layout>
     <CustomFooter />
     </BrowserRouter>
    </div>
  );
}

export default App;
