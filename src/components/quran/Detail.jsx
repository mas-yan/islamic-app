import {
  Box, SimpleGrid, Text, Link, Image, Accordion, AccordionItem, AccordionPanel, AccordionIcon, AccordionButton, Button, useColorModeValue, SkeletonText, Heading, Grid, GridItem, Container, Icon,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'
import { useEffect, useState, useRef } from "react";
import { Link as Href, useParams } from "react-router-dom";
import Ayat from "../../assets/img/ayat.png";
import Ayat1 from "../../assets/img/ayat1.png";
import HeadSurah1 from "../../assets/img/surah.png";
import Error from "../Error";

function Detail() {
  // state
  const params = useParams()
  const [surah, setSurah] = useState([])
  const [detail, setDetail] = useState({})
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(true)
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(new Audio());
  let audios = useRef();

  // fetch data from api
  const getSurah = async () => {
    try {
      let [first, second] = await Promise.all([
        fetch(`https://quran-api.santrikoding.com/api/surah/${params.id}`),
        fetch(`https://al-quran-8d642.firebaseio.com/surat/${params.id}.json?print=pretty`)
      ]);
      const resultFirst = await first.json()
      const resultSecond = await second.json()
      setLoading(false)
      if (resultFirst.status === true && resultSecond.length > 0) {
        setSurah(resultSecond)
        setDetail(resultFirst)
        setAudio(new Audio(resultFirst.audio));
      } else {
        setStatus(false)
      }
    }
    catch (err) {
      setStatus(false)
      console.log(err);
    };
  }

  // togle play sound
  const toggle = () => setPlaying(!playing);


  useEffect(() => {
    setPlaying(false)
    setLoading(true)
    getSurah()
  }, [params.id])

  useEffect(() => {
    audios.current = audio
    !playing ? audios.current.pause() : audios.current.play()
  },
    [playing]
  );

  useEffect(() => {
    return () => {
      audios.current.pause()
    }
  }, [])


  // color ligh/dark
  const bg = useColorModeValue(`url(${Ayat})`, `url(${Ayat1})`)
  const color = useColorModeValue('black', 'white');
  const txtColor = useColorModeValue('blue.700', 'white')

  // style css
  const mySyle = {
    backgroundImage: bg,
    color: color,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    textAlign: 'center',
  }

  return (
    <div>
      <Container mb={5} mt='1' maxW={'1000px'}>
        {status ? (
          <SimpleGrid columns={1} spacingX='40px' spacingY='20px'>
            {loading ? (
              <SimpleGrid columns={1} spacingX='40px' spacingY='20px'>
                {[...Array(20)].map((x, i) =>
                  <Box p={5} shadow='md' key={i} borderWidth='1px' rounded={'md'}>
                    <SkeletonText mt='4' noOfLines={4} spacing='4' />
                  </Box>
                )}
              </SimpleGrid>
            ) :
              <div>
                <Box position={'relative'}>
                  <Image src={HeadSurah1}></Image>
                  <Box maxW={'100%'} w='100%' textAlign='center'>
                    <Box position={'absolute'} maxW={'100%'} w='100%' textAlign='center'>
                      <Text color={txtColor} noOfLines='1' ml={{ base: '-72%', md: '-36%' }} fontWeight={'bold'} fontSize={{ base: '11px', md: '25px', lg: '25px' }} maxW={{ base: '50 % ', md: '100% ' }} mt={{ md: 4, base: '2%' }}>{detail.tempat_turun}</Text>
                    </Box>
                    <Text color={txtColor} noOfLines='1' ml={{ base: '25%', md: 0 }} fontWeight={'bold'} fontSize={{ base: '15px', md: '30px' }} maxW={{ base: '50%', md: '100%' }} mt={{ md: '-10.5%', lg: '-9.5%', base: -9 }}>{detail.nama}</Text>
                    <Text color={txtColor} noOfLines='1' ml={{ base: '25%', md: 0 }} fontWeight={'bold'} fontSize={{ base: '10px', md: '25px', lg: '25px' }} maxW={{ base: '50%', md: '100%' }} mt={{ md: -1, base: -1.5 }}>{detail.nama_latin}</Text>
                    <Box position={'absolute'} maxW={'100%'} w='100%' textAlign='center'>
                      <Text color={txtColor} noOfLines='1' ml={{ base: '72%', md: '72%' }} fontWeight={'bold'} fontSize={{ base: '11px', md: '25px', lg: '25px' }} maxW={{ base: '50 % ', md: '100% ' }} mt={{ md: '-8%', lg: '-16', base: '-6.5%' }}>{detail.jumlah_ayat} Ayat</Text>
                    </Box>
                  </Box>
                </Box>
                <Accordion allowToggle borderColor={'blue.400'} shadow='md' borderWidth='2px' mt={{ lg: '10', base: 9 }} rounded={'md'}>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex='1' textAlign='left'>
                          <Heading fontSize={{ base: 'l', md: 'xl' }} textAlign='center'>
                            <Text color={txtColor} display={'inline-block'} >Deskripsi Surat {detail.nama_latin}</Text>
                            <AccordionIcon color={txtColor} />
                          </Heading>
                        </Box>
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Heading fontSize={'l'}>
                        <Text color={'blue.400'}>Surat:</Text>
                      </Heading>
                      <Text mb={3}>{detail.nama} - {detail.nama_latin} ({detail.arti})</Text>
                      <Heading fontSize={'l'}>
                        <Text color={'blue.400'}>Jumlah Ayat:</Text>
                      </Heading>
                      <Text mb={3}>{detail.jumlah_ayat} Ayat</Text>
                      <Heading fontSize={'l'}>
                        <Text color={'blue.400'}>Tempat Turun:</Text>
                      </Heading>
                      <Text mb={3}>{detail.tempat_turun}</Text>
                      <Heading fontSize={'l'}>
                        <Text color={'blue.400'}>Keterangan</Text>
                      </Heading>
                      <Text mb={3} dangerouslySetInnerHTML={{ __html: detail.deskripsi }}></Text>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <Grid mt='2' templateColumns='repeat(3, 1fr)' gap={6}>
                  <GridItem w='100%'>
                    {detail.surat_sebelumnya ?
                      <Link
                        as={Href}
                        to={`/quran/${detail.surat_sebelumnya.nomor}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Button variant='outline' colorScheme='blue' p='3' mt='5' borderColor={'blue.400'} shadow='md' w='100%' borderWidth='2px' rounded={'md'}>
                          <ArrowBackIcon />
                          <Text display={{ base: 'none', lg: 'inline-block' }} ml='3'>Surat Sebelumnya {detail.surat_sebelumnya.nama_latin}</Text>
                        </Button>
                      </Link>
                      : ''
                    }
                  </GridItem>
                  <GridItem w='100%'>
                    <Button colorScheme='blue' onClick={toggle} p='3' mt='5' borderColor={'blue.400'} shadow='md' w='100%' borderWidth='2px' rounded={'md'}>
                      <Heading fontSize={'l'} textAlign='center'>
                        {playing ?
                          <Icon viewBox="0 0 320 512" mb='1' ><path fill='currentColor' d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z" />
                          </Icon>
                          :
                          <Icon viewBox="0 0 384 512" mb='1' ><path fill='currentColor' d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
                          </Icon>
                        }
                        <Text display={'inline-block'} ml='2'>{playing ? "Stop" : "Play"} Audio</Text>
                      </Heading>
                    </Button>
                  </GridItem>
                  <GridItem w='100%'>
                    {detail.surat_selanjutnya ?
                      <Link
                        as={Href}
                        to={`/quran/${detail.surat_selanjutnya.nomor}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Button variant='outline' colorScheme='blue' p='3' mt='5' borderColor={'blue.400'} shadow='md' w='100%' borderWidth='2px' rounded={'md'}>
                          <ArrowForwardIcon />
                          <Text display={{ base: 'none', lg: 'inline-block' }} ml='3'>Surat Selanjutnya {detail.surat_selanjutnya.nama_latin}</Text>
                        </Button>
                      </Link>
                      :
                      ''
                    }
                  </GridItem>
                </Grid>
              </div>
            }
            {surah.map((item, index) => (
              <Box key={index} p={5} borderColor={'blue.400'} shadow='md' borderWidth='1px' rounded={'md'}>
                <Grid templateColumns='repeat(5, 1fr)' gap={1}>
                  <GridItem >
                    <Box width={'45px'}
                      height={'45px'} style={mySyle}>
                      <Text fontWeight={'bold'} pt='10px' >{item.nomor}</Text>
                    </Box>
                  </GridItem>
                  <GridItem colStart={2} colEnd={6}>
                    <Text fontWeight={'bold'} letterSpacing='1px' fontSize={{ lg: '3xl', base: '2xl' }} textAlign={'right'}>{item.ar}</Text>
                  </GridItem>
                </Grid>
                <Text textAlign={{ base: 'left' }} mt='3' dangerouslySetInnerHTML={{ __html: item.tr }}></Text>
                <Heading mt='3' fontSize={'l'}>
                  <Text color={'blue.400'}>Arti :</Text>
                </Heading>
                {item.id}
              </Box>
            ))}
            <Grid mt='2' templateColumns='repeat(3, 1fr)' gap={6}>
              <GridItem w='100%'>
                {detail.surat_sebelumnya ?
                  <Link
                    as={Href}
                    to={`/quran/${detail.surat_sebelumnya.nomor}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button variant='outline' colorScheme='blue' p='3' borderColor={'blue.400'} shadow='md' w='100%' borderWidth='2px' rounded={'md'}>
                      <ArrowBackIcon />
                      <Text display={{ base: 'none', lg: 'inline-block' }} ml='3'>Surat Sebelumnya {detail.surat_sebelumnya.nama_latin}</Text>
                    </Button>
                  </Link>
                  : ''
                }
              </GridItem>
              <GridItem w='100%'>
                <Button colorScheme='blue' onClick={toggle} p='3' borderColor={'blue.400'} shadow='md' w='100%' borderWidth='2px' rounded={'md'}>
                  <Heading fontSize={'l'} textAlign='center'>
                    {playing ?
                      <Icon viewBox="0 0 320 512" mb='1' ><path fill='currentColor' d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z" />
                      </Icon>
                      :
                      <Icon viewBox="0 0 384 512" mb='1' ><path fill='currentColor' d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
                      </Icon>
                    }
                    <Text display={'inline-block'} ml='2'>{playing ? "Stop" : "Play"} Audio</Text>
                  </Heading>
                </Button>
              </GridItem>
              <GridItem w='100%'>
                {detail.surat_selanjutnya ?
                  <Link
                    as={Href}
                    to={`/quran/${detail.surat_selanjutnya.nomor}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button variant='outline' colorScheme='blue' p='3' borderColor={'blue.400'} shadow='md' w='100%' borderWidth='2px' rounded={'md'}>
                      <ArrowForwardIcon />
                      <Text display={{ base: 'none', lg: 'inline-block' }} ml='3'>Surat Selanjutnya {detail.surat_selanjutnya.nama_latin}</Text>
                    </Button>
                  </Link>
                  :
                  ''
                }
              </GridItem>
            </Grid>
          </SimpleGrid>
        ) : (<Error />)
        }
      </Container>
    </div >
  )
}

export default Detail; 