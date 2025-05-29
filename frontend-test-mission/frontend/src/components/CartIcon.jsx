import { Box, IconButton, Badge, Text, useBreakpointValue } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function CartIcon({ onOpen }) {
  const { quantity, total } = useCart();

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      position={isMobile ? 'fixed' : 'relative'}
      bottom={isMobile ? '20px' : 'auto'}
      right={isMobile ? '20px' : 'auto'}
      zIndex="1"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      bg={isMobile ? 'teal.500' : 'transparent'}
      borderRadius="full"
      p={isMobile ? 2 : 0}
      boxShadow={isMobile ? 'lg' : 'none'}
    >
      <IconButton
        icon={<FiShoppingCart />}
        onClick={onOpen}
        variant="ghost"
        position="relative"
        aria-label="Carrinho"
        size="lg"
        color={isMobile ? 'white' : 'inherit'}
      />
      {quantity > 0 && (
        <Badge
          colorScheme="red"
          borderRadius="full"
          ml={-4}
          mt={-4}
          fontSize="0.8em"
        >
          {quantity}
        </Badge>
      )}
      {!isMobile && (
        <Text ml={2} fontWeight="bold">
          R$ {total.toFixed(2)}
        </Text>
      )}
    </Box>
  );
}
