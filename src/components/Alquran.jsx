import { useEffect, useState } from 'react';
import { Box, Heading, Text, Container, SimpleGrid, SkeletonText, Circle, HStack, Spacer, useColorModeValue } from '@chakra-ui/react'

function Alquran() {
  const [loading, setLoading] = useState(true);
  const [quran, setQuran] = useState([]);

  const bg = useColorModeValue('gray.700', 'white')
  const color = useColorModeValue('white', 'gray.700');

  const fetchQuran = async () => {
    const response = await fetch('https://quran-api.santrikoding.com/api/surah')
    const data = await response.json()
    setQuran(data)
    setLoading(false)
  }
  useEffect(() => {
    fetchQuran()
  }, [])


  return (
    <Container maxW='container.xl' my={'30px'}>
      {!loading > 0 ?
        <SimpleGrid columns={{ base: '1', md: '3' }} spacingX='40px' spacingY='20px'>
          {quran.map((item) => (
            <Box key={item.nomor} p={5} shadow='md' borderWidth='1px' rounded={'md'}>
              <Heading fontSize='xl' justifyContent={'space-between'}>
                <HStack>
                  <Circle size='35px' bg={bg} color={color}>
                    {item.nomor}
                  </Circle>
                  <Spacer />
                  <Text>{item.nama_latin} ({item.nama})</Text>
                </HStack>
              </Heading>
              <Text textAlign={'right'}>{item.tempat_turun}</Text>
              <Text textAlign={'right'}>{item.nama_latin} ({item.jumlah_ayat} Ayat)</Text>
            </Box>
          ))}
        </SimpleGrid>
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