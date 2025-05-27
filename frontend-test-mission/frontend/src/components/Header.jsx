import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Flex, Heading } from '@chakra-ui/react';
import CartIcon from './CartIcon';
import CartPanel from './CartPanel';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  return (
    <main>
    <Flex
      as="header"
      justify="space-between"
      align="center"
      p={4}
      bg="gray.100"
      borderBottom="1px solid #e2e8f0"
    >
      <Heading size="md">Meu Site</Heading>

      <Flex align="center" gap={2}>
        <CartPanel />
        <CartIcon />
      </Flex>
    </Flex>

    {!isHome && (
        <Button size="sm" onClick={() => navigate('/')} variant="outline">
        Voltar
        </Button>
    )}
    </main>
  );
}
