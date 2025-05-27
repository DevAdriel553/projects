import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Header from './components/Header'
import { Box } from '@chakra-ui/react';
import Checkout from './pages/Checkout';

function App() {
  return (

    <Box p={4}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout/>} />
      </Routes>
    </Box>
  );
}

export default App;
