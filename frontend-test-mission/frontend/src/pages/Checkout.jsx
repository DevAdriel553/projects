// ... (importações existentes)
import {
  Box, Button, FormControl, FormLabel, Input, VStack,
  FormErrorMessage, Heading, useToast, Text, Divider
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const toast = useToast();
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await Promise.all(
        items.map(async (item) => {
          const res = await fetch(`http://localhost:3001/products/${item.id}`);
          const productData = await res.json();
          const newQuantity = productData.quantity - item.quantity;

          if (newQuantity < 0) throw new Error('Estoque insuficiente');

          await fetch(`http://localhost:3001/products/${item.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: newQuantity }),
          });
        })
      );

      clearCart();
      toast({
        title: 'Pedido finalizado!',
        description: 'Obrigado pela sua compra.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      reset();
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error('Erro ao finalizar pedido:', err);
      toast({
        title: 'Erro ao finalizar',
        description: 'Não foi possível completar o pedido. Verifique o estoque.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="md">
      <Heading mb={6} textAlign="center">Finalizar Pedido</Heading>

      {items.length === 0 ? (
        <Text textAlign="center">Seu carrinho está vazio.</Text>
      ) : (
        <>
          {/* RESUMO DO PEDIDO */}
          <Box mb={6}>
            <Text fontWeight="bold" fontSize="lg" mb={2}>Resumo do Pedido</Text>
            {items.map((item) => (
              <Box key={item.id} display="flex" justifyContent="space-between" mb={1}>
                <Text>{item.title} x{item.quantity}</Text>
                <Text color="teal.600">
                  {(item.price * item.quantity).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </Text>
              </Box>
            ))}
            <Divider my={2} />
            <Box display="flex" justifyContent="space-between">
              <Text fontWeight="bold">Total:</Text>
              <Text fontWeight="bold" color="teal.700">
                {total.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </Text>
            </Box>
          </Box>

          {/* FORMULÁRIO */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.nome}>
                <FormLabel>Nome</FormLabel>
                <Input {...register('nome', { required: 'Nome é obrigatório' })} />
                <FormErrorMessage>{errors.nome?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  {...register('email', {
                    required: 'Email é obrigatório',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Email inválido',
                    },
                  })}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.cpf}>
                <FormLabel>CPF</FormLabel>
                <Input
                  placeholder="000.000.000-00"
                  {...register('cpf', {
                    required: 'CPF é obrigatório',
                    pattern: {
                      value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                      message: 'Formato inválido. Use xxx.xxx.xxx-xx',
                    },
                  })}
                />
                <FormErrorMessage>{errors.cpf?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.cep}>
                <FormLabel>CEP</FormLabel>
                <Input
                  placeholder="00000-000"
                  {...register('cep', {
                    required: 'CEP é obrigatório',
                    pattern: {
                      value: /^\d{5}-\d{3}$/,
                      message: 'Formato inválido. Use 00000-000',
                    },
                  })}
                />
                <FormErrorMessage>{errors.cep?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.rua}>
                <FormLabel>Rua</FormLabel>
                <Input {...register('rua', { required: 'Rua é obrigatória' })} />
                <FormErrorMessage>{errors.rua?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.bairro}>
                <FormLabel>Bairro</FormLabel>
                <Input {...register('bairro', { required: 'Bairro é obrigatório' })} />
                <FormErrorMessage>{errors.bairro?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.numero}>
                <FormLabel>Número</FormLabel>
                <Input {...register('numero', { required: 'Número é obrigatório' })} />
                <FormErrorMessage>{errors.numero?.message}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                width="full"
                mt={4}
                isLoading={loading}
              >
                Finalizar Pedido
              </Button>
            </VStack>
          </form>
        </>
      )}
    </Box>
  );
}
