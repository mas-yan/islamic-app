import { Link as Href, useResolvedPath } from 'react-router-dom';
import {
  Box,
  Flex,
  Button,
  HStack,
  Menu,
  MenuButton,
  IconButton,
  Link,
  MenuList,
  MenuItem,
  useColorModeValue,
  Stack,
  Spacer,
  useColorMode,
  Text
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';
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
  const { colorMode, toggleColorMode } = useColorMode();
  let resolved = useResolvedPath(location.pathname);
  return (
    <Box position={'sticky'} zIndex="999" width="100%" top={0} bg='gray.900' px={4}>
      <Flex h={16} alignItems={'center'}>
        <HStack alignItems={'center'}>
          <img src={Logo} alt="Qur'an Digital" />
          <Text fontSize='2xl' color={'white'} display={{ base: 'none', md: 'flex' }} ml="10px">Islamic App</Text>
        </HStack>
        <Spacer />
        <HStack
          as={'nav'}
          mr={{ md: '50', lg: '200px' }}
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
                bg: useColorModeValue('gray.600', 'gray.600'),
              }}
              bg={resolved.pathname === link.link && 'gray.500'}
              color={'white'}
              to={link.link}
            >
              {link.name}
            </Link>
          ))}
        </HStack>
        <Spacer />
        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Menu>
              <MenuButton
                display={{ base: 'flex', md: 'none' }}
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
              />
              <MenuList>
                {Links.map((link, index) => (
                  <Link
                    key={index}
                    as={Href}
                    _hover={{
                      textDecoration: 'none',
                    }}
                    to={link.link}
                  >
                    <MenuItem >
                      {link.name}
                    </MenuItem>
                  </Link>
                ))}
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box >
  )
}

export default Navbar;