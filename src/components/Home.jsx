import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  SimpleGrid,
  Container,
  Skeleton,
  useDisclosure,
  Stack,
  Icon,
  useBreakpointValue,
  Flex,
  Avatar,
  chakra
} from '@chakra-ui/react';

import City from './City';

import { ArrowRightIcon, ArrowLeftIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import './../assets/style/style.css';
const testimonials = [
  {
    name: 'Brandon P.',
    role: 'Chief Marketing Officer',
    content:
      'It really saves me time and effort. It is exactly what our business has been lacking. EEZY is the most valuable business resource we have EVER purchased. After using EEZY my business skyrocketed!',
    avatar:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  },
  {
    name: 'Krysta B.',
    role: 'Entrepreneur',
    content:
      "I didn't even need training. We've used EEZY for the last five years. I have gotten at least 50 times the value from EEZY. I made back the purchase price in just 48 hours!",
    avatar:
      'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  },
  {
    name: 'Darcy L.',
    role: 'Movie star',
    content:
      "Thank you for making it painless, pleasant and most of all, hassle free! I'm good to go. No matter where you go, EEZY is the coolest, most happening thing around! I love EEZY!",
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
  },
  {
    name: 'Daniel T.',
    role: 'Musician',
    content:
      'I am so pleased with this product. EEZY is both attractive and highly adaptable. Without EEZY, we would have gone bankrupt by now. Thank you for creating this product!',
    avatar:
      'https://images.unsplash.com/photo-1606513542745-97629752a13b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  },
  {
    name: 'Darcy L.',
    role: 'Movie star',
    content:
      "Thank you for making it painless, pleasant and most of all, hassle free! I'm good to go. No matter where you go, EEZY is the coolest, most happening thing around! I love EEZY!",
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
  },
  {
    name: 'Daniel T.',
    role: 'Musician',
    content:
      'I am so pleased with this product. EEZY is both attractive and highly adaptable. Without EEZY, we would have gone bankrupt by now. Thank you for creating this product!',
    avatar:
      'https://images.unsplash.com/photo-1606513542745-97629752a13b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  },
];
const backgrounds = [
  `url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23ED64A6\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23F56565\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%23ED8936\' /%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ED8936'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2348BB78'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%230BC5EA'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED8936'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%2348BB78'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ECC94B'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%239F7AEA'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%234299E1'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2348BB78'/%3E%3C/svg%3E")`,
];

function Home() {
  // initial
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [jadwal, setJadwal] = useState([])
  const [day, setDay] = useState()
  const fromLocal = JSON.parse(localStorage.getItem('kota') || JSON.stringify({ value: '1301', label: 'KOTA JAKARTA' }));
  const [value, setValue] = useState(fromLocal)
  const [city, setCity] = useState()

  // fetch date from api
  const getJadwal = async () => {
    const date = new Date()
    const now = day ? day : `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    const response = await fetch(
      `https://api.myquran.com/v1/sholat/jadwal/${value.value}/${now}`
    );
    const data = await response.json();
    if (data.status) {
      setJadwal(data.data.jadwal)
      setValue({
        value: data.data.id,
        label: data.data.lokasi
      })
    }
  }

  // set date from now
  const setNow = (newDate) => {
    const date = newDate || new Date();
    setDay(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate())
  };

  // handle next date
  const getNextDate = () => {
    const now = day ? day : new Date()
    const currentDayInMilli = new Date(now).getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const previousDayInMilli = currentDayInMilli + oneDay
    const previousDate = new Date(previousDayInMilli)
    setNow(previousDate)
  }

  // handle prev date
  const getPreviousDate = () => {
    const now = day ? day : new Date()
    const currentDayInMilli = new Date(now).getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const previousDayInMilli = currentDayInMilli - oneDay
    const previousDate = new Date(previousDayInMilli)
    setNow(previousDate)
  }

  // if there is change
  function handleChange(newValue) {
    setValue(newValue);
    setCity(newValue);
  }

  useEffect(() => {
    getJadwal();
  }, [day, city])

  return (
    <div>
      <div className="header">
        <Stack
          bg={useColorModeValue('gray.700', '')}
          as={Box}
          textAlign={'center'}
          pt={{ base: 20, md: 28 }}
          pb={{ base: '120', lg: '160' }}
        >
          <Heading
            zIndex={1}
            color='white'>
            <Text ml='2' as={'span'} color={'white'}>
              Ruang
            </Text>
            <Text ml='2' as={'span'} color={'blue.400'}>
              Islam
            </Text>
          </Heading>
          <Text textAlign={'center'} color='white'>
            Sebuah ruang yang menyediakan informasi mengenai dunia islam
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
          </Stack>
          <Blur
            position={'absolute'}
            top={{ base: 8, lg: -10 }}
            left={{ lg: 50, base: -10 }}
            style={{ filter: 'blur(70px)' }}
          />
        </Stack>

        <Box className="widget-header" textAlign={'center'} position={'absolute'} bottom='0' bg={useColorModeValue('gray.100', 'gray.600')} color='black'>
          <Heading mt={2} fontSize={{ base: 'sm', md: 'xl' }}>
            <Text display={'inline'} color={useColorModeValue('blue.700', 'white')} fontWeight='bold'>Waktu Sholat Daerah <span onClick={onOpen} style={{ cursor: 'pointer' }}> {value.label}<TriangleDownIcon color={useColorModeValue('blue.700', 'white')} pb={{ base: 1, md: 2 }} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} /></span></Text>
            <City value={value} onChange={handleChange} isOpen={isOpen} onClose={onClose} />
          </Heading>
          <button style={{ margin: '0 10px' }} onClick={() => { getPreviousDate() }}><ArrowLeftIcon fontSize={{ base: 'xs', md: 'md' }} color={useColorModeValue('blue.700', 'white')} /></button>
          <Text display={'inline'} fontWeight='bold' fontSize={{ base: 'xs', md: 'md' }} color={useColorModeValue('blue.700', 'white')}>{jadwal.tanggal}</Text>{jadwal.length === 0 && <Skeleton height='5' w='130px' display={'inline-block'} mb='-2' />}
          <button style={{ margin: '0 10px' }} onClick={() => { getNextDate() }}><ArrowRightIcon fontSize={{ base: 'xs', md: 'md' }} color={useColorModeValue('blue.700', 'white')} /></button>
          <SimpleGrid columns={3} p='1.5' spacing='5px' border={1}>
            <Box shadow={'base'} bg={useColorModeValue('white', 'gray.300')} borderRadius={'md'}>
              <Text color={'black'} fontWeight='bold'>Imsak</Text>
              <Heading fontSize={'2xl'}>
                <Text color={'blue.700'} fontWeight='bold'>{jadwal.imsak}</Text>
                {jadwal.length === 0 && <Skeleton mb='2' mx='auto' w='20' height='5' />}
              </Heading>
            </Box>
            <Box shadow={'base'} bg={useColorModeValue('white', 'gray.300')} borderRadius={'md'}>
              <Text color={'black'} fontWeight='bold'>Subuh</Text>
              <Heading fontSize={'2xl'}>
                <Text color={'blue.700'} fontWeight='bold'>{jadwal.subuh}</Text>
                {jadwal.length === 0 && <Skeleton mb='2' mx='auto' w='20' height='5' />}
              </Heading>
            </Box>
            <Box shadow={'base'} bg={useColorModeValue('white', 'gray.300')} borderRadius={'md'}>
              <Text color={'black'} fontWeight='bold'>Dzuhur</Text>
              <Heading fontSize={'2xl'}>
                <Text color={'blue.700'} fontWeight='bold'>{jadwal.dzuhur}</Text>
                {jadwal.length === 0 && <Skeleton mb='2' mx='auto' w='20' height='5' />}
              </Heading>
            </Box>
            <Box shadow={'base'} bg={useColorModeValue('white', 'gray.300')} borderRadius={'md'}>
              <Text color={'black'} fontWeight='bold'>Ashar</Text>
              <Heading fontSize={'2xl'}>
                <Text color={'blue.700'} fontWeight='bold'>{jadwal.ashar}</Text>
                {jadwal.length === 0 && <Skeleton mb='2' mx='auto' w='20' height='5' />}
              </Heading>
            </Box>
            <Box shadow={'base'} bg={useColorModeValue('white', 'gray.300')} borderRadius={'md'}>
              <Text color={'black'} fontWeight='bold'>Maghrib</Text>
              <Heading fontSize={'2xl'}>
                <Text color={'blue.700'} fontWeight='bold'>{jadwal.maghrib}</Text>
                {jadwal.length === 0 && <Skeleton mb='2' mx='auto' w='20' height='5' />}
              </Heading>
            </Box>
            <Box shadow={'base'} bg={useColorModeValue('white', 'gray.300')} borderRadius={'md'}>
              <Text color={'black'} fontWeight='bold'>Isya</Text>
              <Heading fontSize={'2xl'}>
                <Text color={'blue.700'} fontWeight='bold'>{jadwal.isya}</Text>
                {jadwal.length === 0 && <Skeleton mb='2' mx='auto' w='20' height='5' />}
              </Heading>
            </Box>
          </SimpleGrid>
        </Box >
      </div >
      <Box py={'80px'} pt={{ base: '130px', md: '130px' }} bg={useColorModeValue('white', 'gray.700')} width="100%">
        <Container maxW={'7xl'}>
          <Box
            zIndex={1}
            textAlign='center'>
            <Text pt='10' fontWeight={'bold'} fontSize={{ base: '2xl', lg: '4xl' }} ml='2' as={'span'} >
              بَلِّغُوا عَنِّى وَلَوْ آيَة
            </Text>
            <Text fontStyle='italic' ml='2'>
              "Sampaikanlah dariku walau hanya satu ayat"
            </Text>
          </Box>
          <SimpleGrid
            columns={{ base: 1, xl: 3 }}
            spacing={'10'}
            mt={16}
            zIndex='2'
            position='relative'
            mx={'auto'}>
            {testimonials.map((cardInfo, index) => (
              <Flex
                key={index}
                boxShadow={'lg'}
                maxW={'640px'}
                direction={{ base: 'column-reverse', md: 'row' }}
                width={'full'}
                rounded={'xl'}
                p={10}
                justifyContent={'space-between'}
                position={'relative'}
                bg={useColorModeValue('white', 'gray.800')}
                _before={{
                  content: '""',
                  position: 'absolute',
                  zIndex: '-1',
                  height: 'full',
                  maxW: '640px',
                  width: 'full',
                  filter: 'blur(40px)',
                  transform: 'scale(0.98)',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  top: 0,
                  left: 0,
                  backgroundImage: backgrounds[index % 4],
                }}>
                <Flex
                  direction={'column'}
                  textAlign={'left'}
                  justifyContent={'space-between'}>
                  <chakra.p
                    fontFamily={'Inter'}
                    fontWeight={'medium'}
                    fontSize={'15px'}
                    pb={4}>
                    {cardInfo.content}
                  </chakra.p>
                  <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
                    {cardInfo.name}
                    <chakra.span
                      fontFamily={'Inter'}
                      fontWeight={'medium'}
                      color={'gray.500'}>
                      {' '}
                      - {cardInfo.role}
                    </chakra.span>
                  </chakra.p>
                </Flex>
                <Avatar
                  src={cardInfo.avatar}
                  height={'80px'}
                  width={'80px'}
                  alignSelf={'center'}
                  m={{ base: '0 0 35px 0', md: '0 0 0 50px' }}
                />
              </Flex>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </div >
  )
}

export default Home;
export const Blur = (IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '80%', md: '40vw', lg: '30vw' })}
      height={{ base: 250, lg: "560px" }}
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...IconProps}>
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};