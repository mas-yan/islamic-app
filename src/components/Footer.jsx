import {
  Box,
  HStack,
  Container,
  Stack,
  Text,
  chakra,
  Image,
  Icon,
} from '@chakra-ui/react';
import Logo from "../assets/img/logo.png";

export default function SmallWithLogoLeft() {
  return (
    <Box
      bg='gray.800'
      color='gray.200'>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={3}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <HStack alignItems={'center'}>
          <Image
            boxSize='50px'
            objectFit='cover'
            src={Logo}
            alt='Quran Digital'
          />
          <Text color='gray.200' fontWeight='bold'>Lentera Islam</Text>
        </HStack>
        <Text>© 2022 <chakra.span color={'blue.300'}><a target="_blank" href="https://mas-yan.github.io/">Riyan Alfian</a></chakra.span>. All Rights Reserved</Text>
        <Text>
          Dibuat dengan <Icon viewBox="0 0 40 35" boxSize={5} color={'red.400'}>
            <path
              fill={'currentColor'}
              d="M10.7964 5.04553e-07C8.66112 -0.000123335 6.57374 0.632971 4.79827 1.81922C3.0228 3.00547 1.63898 4.69158 0.82182 6.66433C0.00466116 8.63708 -0.209132 10.8079 0.207477 12.9021C0.624087 14.9964 1.65239 16.9201 3.16233 18.4299L19.1153 34.3828C19.2395 34.5074 19.3871 34.6062 19.5496 34.6736C19.7121 34.741 19.8863 34.7757 20.0622 34.7757C20.2381 34.7757 20.4123 34.741 20.5748 34.6736C20.7373 34.6062 20.8848 34.5074 21.0091 34.3828L36.962 18.4272C38.9319 16.3917 40.0228 13.6636 39.9996 10.8311C39.9764 7.99858 38.8409 5.28867 36.838 3.28573C34.835 1.28279 32.1251 0.147283 29.2926 0.124081C26.4601 0.100879 23.732 1.19184 21.6965 3.1617L20.0622 4.79337L18.4305 3.1617C17.4276 2.15892 16.237 1.36356 14.9267 0.821064C13.6163 0.278568 12.2119 -0.000433066 10.7937 5.04553e-07H10.7964Z"
            />
          </Icon> untuk Indonesia
        </Text>
      </Container>
    </Box>
  );
}