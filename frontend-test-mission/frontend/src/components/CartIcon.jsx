import React from 'react';
import { Box, IconButton, Badge, Text, useDisclosure } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import CartPanel from './CartPanel';

export default function CartIcon() {
  const { quantity, total } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="flex-end" mb={4}>
        <IconButton
          icon={<FiShoppingCart />}
          onClick={onOpen}  // abrir drawer aqui
          variant="ghost"
          position="relative"
          aria-label="Carrinho"
          size="lg"
        />
        {quantity > 0 && (
          <Badge colorScheme="red" borderRadius="full" ml={-4} mt={-4} fontSize="0.8em">
            {quantity}
          </Badge>
        )}
        <Text ml={2} fontWeight="bold">
          R$ {total.toFixed(2)}
        </Text>
      </Box>

      {/* CartPanel recebe o controle do drawer */}
      <CartPanel isOpen={isOpen} onClose={onClose} />
    </>
  );
}
