import { useEffect, useState } from 'react';
import { Box, Link, Text, Container, SimpleGrid, SkeletonText, HStack, Spacer, useColorModeValue } from '@chakra-ui/react'
import { Link as Href } from 'react-router-dom';

function Alquran() {
  const [loading, setLoading] = useState(true);
  const [quran, setQuran] = useState([]);

  const bg = useColorModeValue('url("/src/assets/ayat.png")', 'url("/src/assets/ayat1.png")')
  const color = useColorModeValue('black', 'white');

  const fetchQuran = async () => {
    const response = await fetch('https://quran-api.santrikoding.com/api/surah')
    const data = await response.json()
    setQuran(data)
    setLoading(false)
  }
  useEffect(() => {
    fetchQuran()
  }, [])

  const mySyle = {
    backgroundImage: bg,
    // backgroundColor: '#cccccc',
    color: color,
    backgroundPosition: 'center',
    // backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    textAlign: 'center',
    // position: 'relative',
  }


  return (
    <Container maxW='container.xl' my={'30px'}>
      {!loading > 0 ?
        <SimpleGrid columns={{ base: '1', md: '2', lg: '3' }} spacingX='40px' spacingY='20px'>
          {quran.map((item, index) => (
            <Link
              key={index}
              as={Href}
              to={`/quran/${item.nomor}`}
              style={{ textDecoration: 'none' }}
            >
              <Box p={5} shadow='md' borderWidth='1px' rounded={'md'}>
                <Box justifyContent={'space-between'}>
                  <HStack>
                    <Box width={'45px'}
                      height={'45px'} style={mySyle}>
                      <Text fontWeight={'bold'} mt='10px' >{item.nomor}</Text>
                    </Box>
                    <Box display={'block'}>
                      <Text fontWeight={'bold'} fontSize='xl' >{item.nama_latin}</Text>
                      <Text fontSize='md'>{item.tempat_turun} | {item.jumlah_ayat} Ayat</Text>
                    </Box>
                    <Spacer />
                    <Box display={'block'}>
                      <Text fontWeight={'bold'} fontSize='xl' textAlign={'right'}>{item.nama}</Text>
                    </Box>
                    {/* <Text fontWeight={'bold'} fontSize='xl'>{item.nama}</Text> */}
                  </HStack>
                </Box>
              </Box>
            </Link>
          ))
          }
        </SimpleGrid >
        :
        <SimpleGrid columns={{ base: '1', md: '3' }} spacingX='40px' spacingY='20px'>
          {[...Array(20)].map((x, i) =>
            <Box p={5} shadow='md' key={i} borderWidth='1px' rounded={'md'}>
              <SkeletonText mt='4' noOfLines={4} spacing='4' />
            </Box>
          )}
        </SimpleGrid>
      }

    </Container >
  )
}

export default Alquran;