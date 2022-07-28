import { SimpleGrid, Box, Image, Text, Tooltip, useColorModeValue, } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import gambar from "../assets/asmaulhusna.png";
import gambar1 from "../assets/asmaulhusna2.png";
function Asma() {

  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await fetch('https://islamic-api-zhirrr.vercel.app/api/asmaulhusna')
    const data = await response.json()
    setData(data.data)
    console.log(data);
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      <SimpleGrid columns={{ md: 4, base: 2 }} my='5' flexDirection={'row-reverse'} mx={{ md: '10px', base: '1', lg: 20 }} spacingY='15px'>
        {data.map((item, i) =>
          <Box width={{ lg: '300px', base: '100%' }} key={i} position='relative'
            height={{ lg: '300px', base: '100%' }}>
            <Image src={useColorModeValue(gambar, gambar1)} w='100%'></Image>
            <Box position='absolute' top={{ base: '40px', lg: '70px' }} maxW={'100%'} w='100%' textAlign='center'>
              <Tooltip textAlign={'center'} label={item.arabic} hasArrow fontWeight={'bold'} fontSize={'30'}>
                <Text noOfLines='1' ml={{ base: '45px', lg: 0 }} fontWeight={'bold'} fontSize={{ base: '20px', lg: '30px' }} cursor='pointer' maxW={{ base: '50%', lg: '100%' }} mt={{ lg: 0, base: 1 }}>{item.arabic}</Text>
              </Tooltip>
              <Tooltip textAlign={'center'} label={item.translation_id} hasArrow fontWeight={'bold'} fontSize={'15'}>
                <Text cursor={'pointer'} fontSize={'13px'} maxW='69%' mt={{ lg: '5', base: 3, md: '4' }} ml={{ lg: '45px', base: '28px' }} noOfLines={{ base: 1, lg: '2' }} fontWeight='bold'>{item.translation_id}</Text>
              </Tooltip>
              <Tooltip textAlign={'center'} label={item.latin} hasArrow fontWeight={'bold'} fontSize={'15'}>
                <Text cursor={'pointer'} fontWeight={'bold'} fontSize={{ lg: '18px', base: '15px' }} mt='2' ml={{ lg: '75px', base: '45px' }} noOfLines={{ base: 1, lg: '2' }} w='50%' color='blue.400'>{item.latin}</Text>
              </Tooltip>
            </Box>
          </Box>
        )}
      </SimpleGrid>
    </div>
  )
}

export default Asma;