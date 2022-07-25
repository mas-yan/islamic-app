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
    <Box zIndex="999" fontWeight={'bold'} width="100%" boxShadow='md' position={'sticky'} top={0} backdropFilter='auto' backdropBlur='8px' px={4}>
      <Flex h={16} alignItems={'center'}>
        <HStack alignItems={'center'}>
          <img src={Logo} alt="Qur'an Digital" />
          <Text fontSize='2xl' display={{ base: 'none', md: 'flex' }} ml="10px">Islamic App</Text>
        </HStack>
        <Spacer />
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