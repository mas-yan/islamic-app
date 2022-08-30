import {
  AccordionButton, AccordionItem, AccordionIcon, AccordionPanel, Box, Heading, Text, useColorModeValue, Accordion, Container, Spinner, Center, Image
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Error from "./Error";

function Tahlil() {

  // initial state
  const [tahlil, setTahlil] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const txtColor = useColorModeValue('blue.700', 'white')
  const border = useColorModeValue('white', 'gray.800')

  // fetch date from api
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
      {
        loading ?
          <Center h='500px'>
            <Spinner size='xl' />
          </Center>
          : tahlil.map((item, index) => (
            <Box key={index} shadow='md' borderWidth='1px' mt='3' rounded={'md'}>
              <Box p={5}>
                <Text color={'blue.400'} fontWeight='bold'>{index + 1}.) {item.title}:</Text>
                <Heading fontSize={{ lg: '4xl', base: '2xl' }} mt={5} justifyContent={'center'}>
                  <Text textAlign={'center'} lineHeight='2' fontWeight='bold'>{item.arabic}</Text>
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