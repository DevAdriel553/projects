import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Text,
  Box,
  Flex,
  IconButton,
  Stack,
} from '@chakra-ui/react';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { CloseButton, useBreakpointValue } from '@chakra-ui/react';


export default function CartPanel({ isOpen, onClose }) {
  const { items, increment, decrement, removeFromCart, total, clearCart } = useCart();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader display="flex" justifyContent="space-between" alignItems="center">
          Carrinho de Compras
          {useBreakpointValue({ base: true, md: false }) && (
            <CloseButton onClick={onClose} />
          )}
        </DrawerHeader>

        <DrawerBody>
          {items.length === 0 ? (
            <Text>Seu carrinho está vazio.</Text>
          ) : (
            <Stack spacing={4}>
              {items.map(item => (
                <Box key={item.id} borderWidth="1px" borderRadius="md" p={3}>
                  <Flex justify="space-between" align="center">
                    <Box>
                      <Text fontWeight="bold">{item.title}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </Text>
                      <Text fontSize="sm">Qtd: {item.quantity}</Text>
                    </Box>

                    <Flex>
                      <IconButton
                        icon={<FiMinus />}
                        size="sm"
                        onClick={() => decrement(item.id)}
                        aria-label="Diminuir quantidade"
                      />
                      <IconButton
                        icon={<FiPlus />}
                        size="sm"
                        ml={2}
                        onClick={() => increment(item.id)}
                        aria-label="Aumentar quantidade"
                      />
                      <IconButton
                        icon={<FiTrash2 />}
                        size="sm"
                        ml={2}
                        colorScheme="red"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remover item"
                      />
                    </Flex>
                  </Flex>
                </Box>
              ))}
            </Stack>
          )}
        </DrawerBody>

        <DrawerFooter flexDirection="column" alignItems="flex-start">
            <Text fontWeight="bold" mb={2}>
                Total: {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
            <Button
                colorScheme="red"
                variant="outline"
                size="sm"
                onClick={clearCart}
                mb={2}
                isDisabled={items.length === 0}
            >
                Limpar Carrinho
            </Button>
            <Button
                as={Link}
                to={items.length === 0 ? "#" : "/checkout"} // se vazio, não navega
                colorScheme="teal"
                w="100%"
                isDisabled={items.length === 0}
                onClick={() => {
                    if (items.length > 0) {
                    onClose();
                    }
                }}
            >
                Finalizar Pedido
            </Button>

        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
