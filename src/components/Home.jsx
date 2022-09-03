import {
  Box,
  Heading,
  VStack,
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
  Image,
  Link,
  chakra,
  HStack
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import City from './City';

import { ArrowForwardIcon, CheckIcon, MinusIcon, ArrowBackIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import './../assets/style/style.css';
import Allah from "../assets/icon/Allah.png";
import Doa from "../assets/icon/doa.png";
import Kalender from "../assets/icon/kalender.png";
import Quran from "../assets/icon/quran.png";
import Tasbih from "../assets/icon/tasbih.png";
import News from "../assets/icon/news.png";
import Maskot from "../assets/img/maskot.png";
import Lampion from "../assets/img/lampion.png";
import myData from '../../db.json';

function Header() {
  return (
    <Stack
      bg={useColorModeValue('gray.700', '')}
      as={Box}
      textAlign={'center'}
      pt={{ base: 20, md: 28 }}
      pb='160'
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
        left={{ lg: 50, base: -24 }}
        style={{ filter: 'blur(70px)' }}
      />
    </Stack>
  )
}

function Jadwal() {
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
    <Box className="widget-header" textAlign={'center'} position={'absolute'} bottom='0' bg={useColorModeValue('gray.100', 'gray.600')} color='black' >
      <Heading mt={2} fontSize={{ base: 'sm', md: 'xl' }}>
        <Text display={'inline'} color={useColorModeValue('blue.700', 'white')} fontWeight='bold'>Waktu Sholat Daerah <span onClick={onOpen} style={{ cursor: 'pointer' }}> {value.label}<TriangleDownIcon color={useColorModeValue('blue.700', 'white')} pb={{ base: 1, md: 2 }} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} /></span></Text>
        <City value={value} onChange={handleChange} isOpen={isOpen} onClose={onClose} />
      </Heading>
      <button style={{ margin: '0 10px' }} onClick={() => { getPreviousDate() }}><ArrowBackIcon fontSize={{ base: 'xs', md: 'md' }} color={useColorModeValue('blue.700', 'white')} w={6} h={6} /></button>
      <Text display={'inline'} fontWeight='bold' fontSize={{ base: 'xs', md: 'md' }} color={useColorModeValue('blue.700', 'white')}>{jadwal.tanggal}</Text>{jadwal.length === 0 && <Skeleton height='5' w='130px' display={'inline-block'} mb='-2' />}
      <button style={{ margin: '0 10px' }} onClick={() => { getNextDate() }}><ArrowForwardIcon fontSize={{ base: 'xs', md: 'md' }} color={useColorModeValue('blue.700', 'white')} w={6} h={6} /></button>
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
    </Box>
  )
}

function Product() {

  const products = [
    {
      title:
        'Al Quran',
      content:
        'Baca Al Quran',
      link:
        '/quran',
      avatar:
        Quran,
    },
    {
      title:
        "Doa-Doa",
      content:
        "Doa Sehari-hari",
      link:
        "/doa",
      avatar:
        Doa,
    },
    {
      title:
        "Tahlil",
      content:
        "Tahlil Lengkap",
      link:
        "/tahlil",
      avatar:
        Tasbih
    },
    {
      title:
        'Asmaul Husna',
      content:
        '99 Nama Allah',
      link:
        '/asmaulhusna',
      avatar:
        Allah
    },
    {
      title:
        "Jadwal Sholat",
      content:
        "Jadwal Sholat Seluruh Indonesia",
      link:
        "/jadwal",
      avatar:
        Kalender
    },
    {
      title:
        'Berita Islami',
      content:
        'Berita Islami Terkini',
      link:
        '/berita',
      avatar:
        News
    },
  ];
  const backgrounds = [
    `url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23ED64A6\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23F56565\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%23ED8936\' /%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ED8936'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2348BB78'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%230BC5EA'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED8936'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%2348BB78'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ECC94B'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%239F7AEA'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%234299E1'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2348BB78'/%3E%3C/svg%3E")`,
  ];

  return (
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
          columns={{ base: 2, xl: 3 }}
          spacing={{ base: 4, md: '10' }}
          mt={10}
          zIndex='2'
          position='relative'
          mx={'auto'}>
          {products.map((cardInfo, index) => (
            <Link
              key={index}
              as={NavLink}
              style={{ textDecoration: 'none' }}
              to={cardInfo.link}>
              <Flex
                display='flex'
                transition='width 2s'
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: '2xl',
                  _before: {
                    display: 'none',
                  },
                }}
                boxShadow={'lg'}
                direction={{ base: 'column-reverse', md: 'row' }}
                width={'full'}
                rounded={'xl'}
                p={5}
                justifyContent={'space-between'}
                position={'relative'}
                bg={useColorModeValue('white', 'gray.800')}
                _before={{
                  content: '""',
                  position: 'absolute',
                  zIndex: '-1',
                  height: '55%',
                  width: 'full',
                  filter: 'blur(40px)',
                  transform: 'scale(0.98)',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  top: 10,
                  left: 0,
                  backgroundImage: backgrounds[index % 4],
                }}>
                <Flex
                  direction={'column'}
                  textAlign={{ base: 'center', lg: 'left' }}>
                  <Heading
                    fontSize={'15px'}
                    pt={2}
                    pb={{ base: 0, md: 4 }}
                  >
                    {cardInfo.title}
                  </Heading>
                  <chakra.p
                    fontSize={14}
                    fontWeight={'bold'}
                    color={'gray.500'}>
                    {' '}
                    {cardInfo.content}
                  </chakra.p>
                </Flex>
                <Image
                  src={cardInfo.avatar}
                  alignSelf={'center'}
                />
              </Flex>
            </Link>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )

}

function Feature() {
  const [quotes, setQuotes] = useState('');

  const features = [
    {
      title:
        'Al Quran',
      content: [
        'dengan latin dan terjemahan',
        "Disertai murottal",
      ],
    },
    {
      title:
        'Doa',
      content: [
        "Doa sehari hari",
        'Lebih dari 200 doa',
      ],
    },
    {
      title:
        'Tahlil',
      content: [
        "Lengkap dengan terjemahan",
      ],
    },
    {
      title:
        'Asmaul Husna',
      content: [
        "Lengkap dengan arti",
      ],
    },
    {
      title:
        'jadwal Sholat',
      content: [
        "Jadwal seluruh Indonesia",
        "Disertai adzan",
      ],
    },
    {
      title:
        'Berita Islami',
      content: [
        "Berita islam terkini",
        "Dari 3 media yang berbeda",
      ],
    },
  ];

  useEffect(() => {
    const random = myData[Math.floor(Math.random() * myData.length)];
    setQuotes(random)
  }, []);

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.600')}>
      <Container py={16} maxW={'8xl'}>
        <SimpleGrid columns={{ md: 2, base: 1 }} spacing={5}>
          <Stack spacing={4} as={Container}>
            <Heading color={useColorModeValue('blue.700', 'blue.400')} mb={{ lg: '10' }} fontSize={{ md: '3xl', base: '2xl' }}>Apa Yang Ada Di Ruang Islam?</Heading>
            <SimpleGrid columns={{ md: 2, base: 1 }} spacing={5}>
              {features.map((data, i) =>
                <HStack key={i} align={'top'}>
                  <Box mr='2' color={'green.400'}>
                    <Icon as={CheckIcon} />
                  </Box>
                  <VStack align={'start'}>
                    <Text fontWeight={600} fontSize={'xl'}>{data.title}</Text>
                    {data.content.map((item, index) =>
                      <Box key={index} color={useColorModeValue('gray.500', 'gray.300')} fontSize={{ lg: 14, md: 10 }}>
                        <Icon mr='2' as={MinusIcon} />
                        <Text display={'inline'} fontWeight={600}>{item}</Text>
                      </Box>
                    )}
                  </VStack>
                </HStack>
              )}
            </SimpleGrid>
            <br />
          </Stack>
          <Box
            position={'relative'}
            left={{ lg: '20' }}
            w={{ lg: '400px', md: '350px', }}
            bg={useColorModeValue('white', 'gray.700')}
            display={{ md: 'block', base: 'none' }}
            rounded={'2xl'}>
            <Image
              src={Maskot}
              h={{ md: '450px', lg: '450px' }}
              objectFit='cover'
              zIndex={'2'}
              position={'relative'}
            />
            <Image
              position={'absolute'}
              src={Lampion}
              top='0'
              zIndex={'1'}
              h='500px'
              objectFit='cover'
            />
          </Box>
        </SimpleGrid>
        <Box rounded='md' mt='10' mx={{ lg: 10 }}>
          <Heading color={useColorModeValue('blue.700', 'blue.400')} pb='2' fontSize={'md'} textAlign='center'>Quotes Untukmu :</Heading>
          <Text fontWeight='bold' fontSize={'2xl'} textAlign={'center'}>{quotes.arabic}</Text>
          <Text textAlign={'center'}>{quotes.arti}</Text>
        </Box>
      </Container >
    </Box >
  )
}

function Ayat() {
  const [ayat, setAyat] = useState('');
  const [surat, setSurat] = useState('');
  const [arti, setArti] = useState('');

  const getAyat = async () => {
    const data = await fetch('https://api.banghasan.com/quran/format/json/acak')
    const response = await data.json()
    setAyat(response.acak.ar.teks)
    setSurat(`Q.S ${response.surat.nama} ${response.surat.nomor}:${response.acak.ar.ayat}`)
    setArti(response.acak.id.teks)
  }
  useEffect(() => {
    getAyat()
  }, []);
  return (
    <Box bg={useColorModeValue('white', 'gray.800')}>
      <Container maxW={'6xl'} py={16}>
        <Heading textAlign='center' color={useColorModeValue('blue.700', 'blue.400')} mb='10' fontSize={'3xl'}>Random Ayat</Heading>
        <Box rounded={'xl'} p='4' bg='blue.700' color='white' shadow={'xl'}>
          <Text textAlign='right' fontWeight='bold' fontSize={'2xl'}>{ayat}</Text>
          <Text textAlign='left' fontWeight='bold' mt='2' fontSize={'xl'}>{surat}</Text>
          <Text textAlign='left'>{arti}</Text>
        </Box>
      </Container>
    </Box>
  )
}

function Home() {
  // initial
  return (
    <div>
      <div className="header">
        <Header />
        <Jadwal />
      </div>
      <Product />
      <Feature />
      <Ayat />
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
      <circle cx="244" cy="106" r="139" fill="#4299E1" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};