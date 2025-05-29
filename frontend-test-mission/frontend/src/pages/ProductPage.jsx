import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Text, Button, Spinner, Heading, Flex } from '@chakra-ui/react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import placeholderImage from '../assets/produto_placeholder.png';


export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    api.get(`/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );
  }

  if (!product) {
    return (
      <Box p={8} textAlign="center">
        <Text>Produto não encontrado.</Text>
      </Box>
    );
  }

  return (
    <Box p={8} maxW="600px" mx="auto">
      <Image src={product.image} alt={product.title} borderRadius="md" mb={6} height="500px" fallbackSrc={placeholderImage}/>
      <Heading mb={2}>{product.title}</Heading>
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </Text>
      <Text mb={4}>Estoque: {product.quantity}</Text>
      <Button
        colorScheme="teal"
        onClick={() => addToCart(product)}
        isDisabled={product.quantity === 0}
      >
        {product.quantity === 0 ? 'Sem estoque' : 'Comprar'}
      </Button>
    </Box>
  );
}
