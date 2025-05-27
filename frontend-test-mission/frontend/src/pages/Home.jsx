import { useEffect, useState } from 'react';
import { SimpleGrid, Box, Image, Text, Button, Heading } from '@chakra-ui/react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <Box>
      <Heading mb={4}>Produtos</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {products.map((product) => (
          <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Image
              src={product.photo}
              alt={product.title}
              objectFit="cover"
              height="200px"
              width="100%"
              onClick={() => navigate(`/product/${product.id}`)}
              cursor="pointer"
            />
            <Text mt={2} fontWeight="bold">{product.title}</Text>
            <Text>R$ {product.price.toFixed(2)}</Text>
            <Button mt={2} colorScheme="teal" onClick={() => addToCart(product)}>
              Comprar
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
