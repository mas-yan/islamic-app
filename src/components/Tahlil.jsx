import {
  AccordionButton, AccordionItem, AccordionIcon, AccordionPanel, Box, Heading, Text, useColorModeValue, Accordion, Container, Spinner, Center, Image
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Error from "./Error";

import Pray from "../assets/pray.png";

function Tahlil() {
  const [tahlil, setTahlil] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const txtColor = useColorModeValue('blue.700', 'white')
  const border = useColorModeValue('white', 'gray.800')

  // const bg = {
  //   background: `url(${Pray}) right center no-repeat`,
  //   backgroundColor: 'right 30px center'
  // }
  const getData = async () => {
    const response = await fetch('https://islamic-api-zhirrr.vercel.app/api/tahlil')

    if (response.status == 200) {
      const data = await response.json()
      setTahlil(data.data)
      setLoading(false)
    } else {
      setLoading(false)
      setError(true)
    }
  }

  useEffect(() => {
    getData()
  }, []);
  return (
    <Container mb={5} mt='1' maxW={'1000px'}>
      {/* <Box w='100%' bgGradient='linear(to-r, blue.700, blue.900)' p='3' rounded={'md'} shadow='md'>
        <Text color={'white'} fontWeight='bold'>Tahlilan merupakan ritual pembacaan lafal tahlil yang lazim di masyarakat Nusantara sejak ratusan tahun. Pembacaan tahlil biasa dilakukan oleh masyarakat dalam rangka mendoakan jenazah baru di makamnya, ahli kubur yang telah lama dimakamkan, dan mendoakan ahli kubur dalam peringatan 1-7 hari, 15 hari, 40 hari, 100 hari, 1000 hari di rumah ahli musibah.</Text>
        <Image src={Pray} position={'absolute'} w='40%' top='-100px' />
      </Box> */}
      {
        loading ?
          <Center h='500px'>
            <Spinner size='xl' />
          </Center>
          : tahlil.map((item, index) => (
            <Box key={index} shadow='md' borderWidth='1px' mt='3' rounded={'md'}>
              <Box p={5}>
                <Text color={txtColor} fontWeight='bold'>{index + 1}.) {item.title}:</Text>
                <Heading fontSize={{ lg: '4xl', base: '2xl' }} mt={5} justifyContent={'center'}>
                  <Text color={txtColor} textAlign={'center'} lineHeight='2' fontWeight='bold'>{item.arabic}</Text>
                </Heading>
              </Box>
              <Accordion allowToggle border={border} borderWidth='0px'>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex='1' textAlign='left'>
                        <Text textAlign={'center'}>
                          <AccordionIcon color={txtColor} />
                        </Text>
                      </Box>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Heading fontSize={'l'}>
                      <Text color={'blue.400'}>Arti: </Text>
                    </Heading>
                    <Text fontSize='md'>{item.translation}</Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          ))
      }
      {error && <Error />}
    </Container >
  )
}

export default Tahlil;