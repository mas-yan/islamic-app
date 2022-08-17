import {
  Box, Container, SimpleGrid, Heading, Text, Stack, useColorModeValue, Image, Center, Skeleton, SkeletonText
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
export default function Berita() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState({
    cnbc: {
      image: '',
      link: '',
      pubDate: '',
      posts: []
    },
    republika: {
      image: '',
      link: '',
      pubDate: '',
      posts: []
    },
    sindonews: {
      image: '',
      link: '',
      pubDate: '',
      posts: []
    }
  });

  const bg = useColorModeValue('white', 'gray.900')
  const color = useColorModeValue('gray.700', 'white')

  const dataNews = async () => {
    try {
      let [cnbc, republika, sindonews] = await Promise.all([
        fetch(`https://api-berita-indonesia.vercel.app/cnbc/syariah/`),
        fetch(`https://api-berita-indonesia.vercel.app/republika/islam/`),
        fetch(`https://api-berita-indonesia.vercel.app/sindonews/kalam/`)
      ]);
      const resultCnbc = await cnbc.json()
      const resultRepublika = await republika.json()
      const resultSindoNews = await sindonews.json()
      if (resultCnbc.success === true && resultSindoNews.success === true && resultRepublika.success === true) {
        setNews({
          cnbc: {
            image: resultCnbc.data.image,
            title: resultCnbc.data.title,
            link: resultCnbc.data.link,
            posts: resultCnbc.data.posts,
            pubDate: resultCnbc.data.pubDate
          },
          republika: {
            image: resultRepublika.data.image,
            title: resultRepublika.data.title,
            link: resultRepublika.data.link,
            posts: resultRepublika.data.posts,
            pubDate: resultRepublika.data.pubDate
          },
          sindonews: {
            image: resultSindoNews.data.image,
            title: resultSindoNews.data.title,
            link: resultSindoNews.data.link,
            posts: resultSindoNews.data.posts,
            pubDate: resultSindoNews.data.pubDate
          }
        })
        setLoading(false)
      } else {
        console.log('something error');
        setLoading(false)
      }
    }
    catch (err) {
      setLoading(false)
      console.log(err);
    };
  }
  useEffect(() => {
    dataNews()
  }, [])
  return (
    <Container maxW='7xl' my={'30px'}>
      {!loading > 0 ?
        <div>
          <Heading>
            <Text textAlign={'center'} color='blue.400' fontWeight='bold'>Berita Islami Terkini</Text>
          </Heading>
          <Box borderWidth={'1px'} boxShadow={'md'} rounded={'xl'} overflow={'hidden'} p={6} mt={6}>
            <a href={news.cnbc.link} target='blank'>
              <Center>
                <Image
                  maxW='100px'
                  src={news.cnbc.image}
                  alt='news.cnbc'
                />
              </Center>
              <Text textAlign={'center'} fontWeight='bold' mt='2'>{news.cnbc.title}</Text>
            </a>
            <SimpleGrid columns={{ base: '1', md: '3' }} mt='10' spacingX='40px' spacingY='20px'>
              {news.cnbc.posts.slice(0, 10).map((item, index) => (
                <a href={item.link} target='blank' key={index}>

                  <Box
                    bg={bg}
                    boxShadow={'md'}
                    rounded={'md'}
                    p={{ lg: 6, base: 4 }}
                    overflow={'hidden'}
                  >
                    <Box
                      bg={'gray.100'}
                      mt={-6}
                      mx={-6}
                      mb={6}
                      pos={'relative'}
                    >
                      <Image
                        src={item.thumbnail}
                        w={'full'}
                        objectFit='cover'
                      />
                    </Box>
                    <Stack>
                      <Text
                        color={'green.500'}
                        textTransform={'uppercase'}
                        fontWeight={800}
                        fontSize={'sm'}
                        letterSpacing={1.1}>
                        {new Date(item.pubDate).toLocaleDateString()}
                      </Text>
                      <Heading
                        color={color}
                        fontSize={'xl'}
                        fontFamily={'body'}>
                        {item.title}
                      </Heading>
                      <Text color={'gray.500'}>
                        {item.description}
                      </Text>
                    </Stack>
                  </Box>
                </a>
              ))
              }
            </SimpleGrid>
          </Box>

          {/* Republika */}
          <Box borderWidth={'1px'} boxShadow={'md'} rounded={'xl'} overflow={'hidden'} p={6} mt={6}>
            <a href={news.republika.link} target='blank'>
              <Center>
                <Image
                  maxW='300px'
                  src={news.republika.image}
                  alt='republika'
                />
              </Center>
              <Text textAlign={'center'} fontWeight='bold' mt='2'>{news.republika.title}</Text>
            </a>
            <SimpleGrid columns={{ base: '1', md: '3' }} mt='10' spacingX='40px' spacingY='20px'>
              {news.republika.posts.slice(0, 10).map((item, index) => (
                <a href={item.link} target='blank' key={index}>

                  <Box
                    bg={bg}
                    boxShadow={'md'}
                    rounded={'md'}
                    p={{ lg: 6, base: 4 }}
                    overflow={'hidden'}
                  >
                    <Box
                      bg={'gray.100'}
                      mt={-6}
                      mx={-6}
                      mb={6}
                      pos={'relative'}
                    >
                      <Image
                        src={item.thumbnail}
                        w={'full'}
                        objectFit='cover'
                      />
                    </Box>
                    <Stack>
                      <Text
                        color={'green.500'}
                        textTransform={'uppercase'}
                        fontWeight={800}
                        fontSize={'sm'}
                        letterSpacing={1.1}>
                        {new Date(item.pubDate).toLocaleDateString()}
                      </Text>
                      <Heading
                        color={color}
                        fontSize={'xl'}
                        fontFamily={'body'}>
                        {item.title}
                      </Heading>
                      <Text color={'gray.500'}>
                        {item.description}
                      </Text>
                    </Stack>
                  </Box>
                </a>
              ))
              }

            </SimpleGrid>
          </Box>

          {/* sindonews */}
          <Box borderWidth={'1px'} boxShadow={'md'} rounded={'xl'} overflow={'hidden'} p={6} mt={6} >
            <a href={news.sindonews.link} target='blank'>
              <Center>
                <Image
                  maxW='300px'
                  src={news.sindonews.image}
                  alt='sindonews'
                />
              </Center>
              <Text textAlign={'center'} fontWeight='bold' mt='2'>{news.sindonews.title}</Text>
            </a>
            <SimpleGrid columns={{ base: '1', md: '3' }} mt='10' spacingX='40px' spacingY='20px'>
              {news.sindonews.posts.slice(0, 10).map((item, index) => (
                <a href={item.link} target='blank' key={index}>

                  <Box
                    bg={bg}
                    boxShadow={'md'}
                    rounded={'md'}
                    p={{ lg: 6, base: 4 }}
                    overflow={'hidden'}
                  >
                    <Box
                      bg={'gray.100'}
                      mt={-6}
                      mx={-6}
                      mb={6}
                      pos={'relative'}
                    >
                      <Image
                        src={item.thumbnail}
                        w={'full'}
                        objectFit='cover'
                      />
                    </Box>
                    <Stack>
                      <Text
                        color={'green.500'}
                        textTransform={'uppercase'}
                        fontWeight={800}
                        fontSize={'sm'}
                        letterSpacing={1.1}>
                        {new Date(item.pubDate).toLocaleDateString()}
                      </Text>
                      <Heading
                        color={color}
                        fontSize={'xl'}
                        fontFamily={'body'}>
                        {item.title}
                      </Heading>
                      <Text color={'gray.500'}>
                        {item.description}
                      </Text>
                    </Stack>
                  </Box>
                </a>
              ))
              }

            </SimpleGrid>
          </Box >
        </div >
        :
        <SimpleGrid columns={{ base: '1', md: '3' }} spacingX='40px' spacingY='20px'>
          {[...Array(20)].map((x, i) =>
            <Box p={5} shadow='md' key={i} borderWidth='1px' rounded={'md'}>
              <Skeleton>
                <Box height={28}></Box>
              </Skeleton>
              <SkeletonText mt='4' noOfLines={4} spacing='4' />
            </Box>
          )}
        </SimpleGrid>
      }
    </Container >
  )
}
