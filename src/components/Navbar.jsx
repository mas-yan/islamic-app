import { Link as Href, useResolvedPath } from 'react-router-dom';
import {
  Box,
  Flex,
  Button,
  HStack,
  IconButton,
  Link,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
  useDisclosure,
  Collapse
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Logo from "../assets/logo.png";

const Links = [
  {
    name: 'home',
    link: '/',
  },
  {
    name: 'Quran',
    link: '/quran',
  },
  {
    name: 'Doa',
    link: '/doa',
  },
  {
    name: 'Tahlil',
    link: '/tahlil',
  },
]

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  let resolved = useResolvedPath(location.pathname);
  let path = resolved.pathname;
  return (
    <Box zIndex="999" fontWeight={'bold'} width="100%" boxShadow='md' position={'sticky'} top={0} backdropFilter='auto' backdropBlur='8px' px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <Link
          as={Href}
          to={'/'}
          style={{ textDecoration: 'none' }}
        >
          <HStack alignItems={'center'}>
            <img src={Logo} alt="Qur'an Digital" />
            <Text fontSize='2xl'>Islamic App</Text>
          </HStack>
        </Link>
        <HStack
          as={'nav'}
          mr={{ md: '50', lg: '150px' }}
          spacing={8}
          display={{ base: 'none', md: 'flex' }}>
          {Links.map((link, index) => (
            <Link
              key={index}
              as={Href}
              px={2}
              py={1}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: 'gray.500',
                color: 'white',
              }}
              bg={useColorModeValue(resolved.pathname === link.link ? 'gray.700' : 'white', resolved.pathname === link.link ? 'white' : 'gray.800')}
              color={useColorModeValue(resolved.pathname === link.link ? 'white' : 'gray.700', resolved.pathname === link.link ? 'gray.700' : 'white')}
              to={link.link}
            >
              {link.name}
            </Link>
          ))}
        </HStack>
        <Flex alignItems={'center'}>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <Link
                key={link.link}
                as={Href}
                px={2}
                py={1}
                rounded={'md'}
                onClick={onClose}
                _hover={{
                  textDecoration: 'none',
                  bg: 'gray.500',
                  color: 'white',
                }}
                bg={`${path === link.link ? 'gray.700' : 'white'}`}
                _dark={{ bg: `${path === link.link ? 'white' : 'gray.800'}`, color: `${path === link.link ? 'gray.700' : 'white'}` }}
                color={`${path === link.link ? 'white' : 'gray.700'}`}
                to={link.link}
              >
                {link.name}
              </Link>
            ))}
          </Stack>
        </Box>
      </Collapse>
    </Box>
  )
}

export default Navbar;