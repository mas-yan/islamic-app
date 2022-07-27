import { Box, SimpleGrid, Text, useColorModeValue, Spacer, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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


  const bg = useColorModeValue('url("/src/assets/ayat.png")', 'url("/src/assets/ayat1.png")')
  const color = useColorModeValue('black', 'white');
  const mySyle = {
    backgroundImage: bg,
    // backgroundColor: '#cccccc',
    color: color,
    backgroundPosition: 'center',
    // backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    textAlign: 'center',
  }

  return (
    <div>
      {loading && <div>Loading...</div>}
      {status ? (
        <div>
          <SimpleGrid mx={5} my='20' columns={1} spacingX='40px' spacingY='20px'>
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
                    <Text fontWeight={'bold'} fontSize={{ lg: '2xl', base: 'xl' }} textAlign={'right'}>{item.ar}</Text>
                  </GridItem>
                </Grid>
                <Text fontSize='md' mt='3'>{item.idn}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </div >
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