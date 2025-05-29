import { Box, Flex, Heading, Spacer, IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import CartIcon from './CartIcon';
import CartPanel from './CartPanel';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';


export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  

  return (
    <Box bg="teal.500" color="white" px={4} py={3} boxShadow="md">
      <Flex align="center" maxW="6xl" mx="auto">
        <Link to="/">
          <Heading fontSize="2xl">Frontend Test Mission</Heading>
        </Link>  <Spacer />
        <Link to="/" style={{ marginRight: '1rem' }}>PRODUTOS</Link>
        <Spacer />

        <CartIcon onOpen={onOpen} />
        <IconButton
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="ghost"
          color="white"
          ml={2}
          aria-label="Alternar modo"
        />
        <CartPanel isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Box>
  );
}
