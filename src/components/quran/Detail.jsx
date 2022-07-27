import {
  Box, SimpleGrid, Text, useColorModeValue, Heading, Grid, GridItem, Container
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ayat from "../../assets/ayat.png";
import Ayat1 from "../../assets/ayat1.png";

function Detail() {
  const params = useParams()
  const [surah, setSurah] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(true)

  const getSurah = async () => {
    const response = await fetch(`https://quran-api.santrikoding.com/api/surah/${params.id}`)
    const data = await response.json()
    setLoading(false)
    if (data.status === true) {
      setSurah(data.ayat)
    } else {
      setStatus(false)
    }
  }
  useEffect(() => {
    getSurah()
  }, [])


  const bg = useColorModeValue(`url(${Ayat})`, `url(${Ayat1})`)
  const color = useColorModeValue('black', 'white');
  const mySyle = {
    backgroundImage: bg,
    color: color,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    textAlign: 'center',
  }

  return (
    <div>
      {loading && <div>Loading...</div>}
      {status ? (
        <Container maxW={'1000px'}>
          <SimpleGrid my='20' columns={1} spacingX='40px' spacingY='20px'>
            {surah.map((item, index) => (
              <Box key={index} p={5} shadow='md' borderWidth='1px' rounded={'md'}>
                <Grid templateColumns='repeat(5, 1fr)' gap={1}>
                  <GridItem >
                    <Box width={'45px'}
                      height={'45px'} style={mySyle}>
                      <Text fontWeight={'bold'} pt='10px' >{item.nomor}</Text>
                    </Box>
                  </GridItem>
                  <GridItem colStart={2} colEnd={6}>
                    <Text fontWeight={'bold'} fontSize={{ lg: '3xl', base: '2xl' }} textAlign={'right'}>{item.ar}</Text>
                  </GridItem>
                </Grid>
                <Text textAlign={'right'} dangerouslySetInnerHTML={{ __html: item.tr }}></Text>
                <Heading mt='3' fontSize={'l'}>
                  <Text color={'blue.400'}>Arti :</Text>
                </Heading>
                {item.idn}
              </Box>
            ))}
          </SimpleGrid>
        </Container >
      ) : (
        <div>
          <h1>404</h1>
        </div>
      )
      }
    </div >
  )
}

export default Detail; 