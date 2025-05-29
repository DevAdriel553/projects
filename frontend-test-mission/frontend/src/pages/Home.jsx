import { useEffect, useState } from 'react';
import {
  SimpleGrid,
  Box,
  Image,
  Text,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import placeholderImage from '../assets/produto_placeholder.png';


export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardHover = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <Box maxW="1200px" mx="auto" px={4} py={8}>
      <Heading mb={8} textAlign="center" fontSize={{ base: '2xl', md: '4xl' }}>
        Nossos Produtos
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
        {products.map((product) => (
          <Box
            key={product.id}
            bg={cardBg}
            borderRadius="xl"
            overflow="hidden"
            boxShadow="md"
            transition="all 0.3s"
            _hover={{ transform: 'scale(1.03)', bg: cardHover }}
            display="flex"
            flexDirection="column"
            h="100%" 
          >
            <Image
              src={product.picture}
              alt={product.title}
              fallbackSrc={placeholderImage}
              height="220px"
              w="100%"
              objectFit="contain"
              onClick={() => navigate(`/product/${product.id}`)}
              cursor="pointer"
              transition="all 0.3s"
              _hover={{ opacity: 0.9 }}
            />

            <Box p={4} display="flex" flexDirection="column" flex="1">
              <Box mb={4}>
                <Text fontWeight="bold" fontSize="lg" mb={1}>
                  {product.title}
                </Text>
                <Text fontSize="xl" color="teal.500" fontWeight="semibold">
                  R$ {product.price.toFixed(2)}
                </Text>
              </Box>

              <Box mt="auto">
                <Button
                  isDisabled={product.quantity === 0}
                  colorScheme="teal"
                  size="sm"
                  onClick={() => addToCart(product)}
                  w="100%"
                  aria-label={`Adicionar ${product.title} ao carrinho`}
                >
                  {product.quantity === 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
                </Button>
              </Box>
            </Box>
          </Box>

        ))}
      </SimpleGrid>
    </Box>
  );
}
