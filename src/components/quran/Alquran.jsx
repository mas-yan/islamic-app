import { useEffect, useState } from 'react';
import {
  Box, Link, Text, Container, SimpleGrid, SkeletonText, HStack, Spacer, useColorModeValue
} from '@chakra-ui/react'
import { Link as Href } from 'react-router-dom';
import Ayat from "../../assets/img/ayat.png";
import Ayat1 from "../../assets/img/ayat1.png";
import Error from '../Error';

function Alquran() {
  // state
  const [loading, setLoading] = useState(true);
  const [quran, setQuran] = useState([]);
  const [error, setError] = useState(false);

  // color ligth/dark
  const bg = useColorModeValue(`url(${Ayat})`, `url(${Ayat1})`)
  const color = useColorModeValue('black', 'white');

  // fetch data from api
  const fetchQuran = async () => {
    const response = await fetch('https://quran-api.santrikoding.com/api/surah')
    if (response.status == 200) {
      const data = await response.json()
      setQuran(data)
      setLoading(false)
    } else {
      setLoading(false)
      setError(true)
    }
  }

  useEffect(() => {
    fetchQuran()
  }, [])

  // style css
  const mySyle = {
    backgroundImage: bg,
    color: color,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    textAlign: 'center',
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
      {
        error && <Error />}

    </Container >
  )
}

export default Alquran;