import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box, Button, FormControl, FormLabel, Input, VStack, FormErrorMessage, Heading, useToast
} from '@chakra-ui/react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';  // importando o hook

export default function Checkout() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const toast = useToast();
  const { clearCart } = useCart();
  const navigate = useNavigate();  // inicializando o navigate

  const onSubmit = (data) => {
    console.log('Pedido finalizado:', data);
    clearCart();
    toast({
      title: 'Pedido finalizado!',
      description: 'Obrigado pela sua compra.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    reset();
    // redireciona para a página inicial após 2 segundos
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="md">
      <Heading mb={6} textAlign="center">Finalizar Pedido</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={errors.nome}>
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              {...register('nome', { required: 'Nome é obrigatório' })}
            />
            <FormErrorMessage>{errors.nome && errors.nome.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register('email', {
                required: 'Email é obrigatório',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Email inválido'
                }
              })}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.cpf}>
            <FormLabel>CPF</FormLabel>
            <Input
              type="text"
              {...register('cpf', {
                required: 'CPF é obrigatório',
                pattern: {
                  value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                  message: 'Formato inválido. Use xxx.xxx.xxx-xx'
                }
              })}
              placeholder="000.000.000-00"
            />
            <FormErrorMessage>{errors.cpf && errors.cpf.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.cep}>
            <FormLabel>CEP</FormLabel>
            <Input
              type="text"
              {...register('cep', {
                required: 'CEP é obrigatório',
                pattern: {
                  value: /^\d{5}-\d{3}$/,
                  message: 'Formato inválido. Use 00000-000'
                }
              })}
              placeholder="00000-000"
            />
            <FormErrorMessage>{errors.cep && errors.cep.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.rua}>
            <FormLabel>Rua</FormLabel>
            <Input
              type="text"
              {...register('rua', { required: 'Rua é obrigatória' })}
            />
            <FormErrorMessage>{errors.rua && errors.rua.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.bairro}>
            <FormLabel>Bairro</FormLabel>
            <Input
              type="text"
              {...register('bairro', { required: 'Bairro é obrigatório' })}
            />
            <FormErrorMessage>{errors.bairro && errors.bairro.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.numero}>
            <FormLabel>Número</FormLabel>
            <Input
              type="text"
              {...register('numero', { required: 'Número é obrigatório' })}
            />
            <FormErrorMessage>{errors.numero && errors.numero.message}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Serviço Rest (opcional)</FormLabel>
            <Input type="text" {...register('servicoRest')} />
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full" mt={4}>
            Finalizar Pedido
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
