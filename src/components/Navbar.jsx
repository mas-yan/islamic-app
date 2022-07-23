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
  Container,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';

const Links = [
  {
    name: 'home',
    link: '/',
  },
  {
    name: 'Doa',
    link: '/doa',
  },
]

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  let resolved = useResolvedPath(location.pathname);
  return (
    <Box position={'sticky'} width="100%" top={0} bg={useColorModeValue('gray.500', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Box>Logo</Box>
          <Container>
            <HStack
              as={'nav'}
              spacing={4}
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
                    bg: useColorModeValue('gray.700', 'gray.700'),
                  }}
                  bg={resolved.pathname === link.link && 'gray.700'}
                  color={'white'}
                  to={link.link}
                >
                  {link.name}
                </Link>
              ))}
            </HStack>
          </Container>
        </HStack>

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