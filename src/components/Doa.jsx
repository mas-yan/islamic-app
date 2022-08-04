import { useEffect, useState } from "react";
import {
  Modal, ModalContent, Container, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ModalOverlay, Box, Heading, useDisclosure, Spinner, Button, Text, SimpleGrid, SkeletonText, Center
} from '@chakra-ui/react'
import Error from "./Error";
function Doa() {

  // get all start
  const [doa, setDoa] = useState([]);
  const [isNext, setIsNext] = useState(false);
  const [circle, setCircle] = useState(false);
  const [end, setEnd] = useState(false);
  let [page, setPage] = useState(1);
  const [lastpage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getDoa = async () => {
    const response = await fetch(
      `https://api-islamic.herokuapp.com/api/doa?page=${page}`
    );
    if (response.status == 200) {
      const data = await response.json();
      setLastPage(data.last_page);
      setLoading(false)
      if (page <= lastpage) {
        setCircle(true);
        setIsNext(false)
        setDoa([...doa, ...data.data]);
        setPage(page + 1)
      } else {
        setCircle(false)
        setEnd(true)
      }
    } else {
      setLoading(false)
      setError(true)
    }
  };

  function handleScroll() {
    setIsNext(true)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getDoa();
  }, []);

  useEffect(() => {
    if (!isNext) return;
    getDoa();
  }, [isNext]);
  // end get all

  // start detail
  const [detail, setDatail] = useState({});
  const detailDoa = async (id) => {
    const response = await fetch(
      `https://api-islamic.herokuapp.com/api/doa/${id}`
    );
    const data = await response.json();
    setDatail(data);
    setOverlay(<OverlayTwo />)
    onOpen()
  }

  const OverlayTwo = () => (
    <ModalOverlay
      bg='none'
      backdropFilter='auto'
      backdropInvert='80%'
      backdropBlur='2px'
    />
  )

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(<OverlayTwo />)

  // end detail

  return (
    <Container maxW='container.xl' my={'30px'}>
      <SimpleGrid columns={{ base: '1', md: '3', lg: '4' }} spacingX='40px' spacingY='20px'>
        {doa.map((item, index) => (
          <Box key={index} p={5} shadow='md' borderWidth='1px' rounded={'md'} onClick={() => detailDoa(item.id)} cursor="pointer">
            <Heading fontSize='xl' justifyContent={'center'}>
              <Text textAlign={'center'} noOfLines={2}>{item.nama}</Text>
            </Heading>
          </Box>
        ))}
      </SimpleGrid>
      {
        circle &&
        <Center my={'40px'}>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Center>
      }
      {end && <Text mt='20px' textAlign={'center'}>Anda telah berada di akhir halaman</Text>}
      <Modal useInert={false} isCentered isOpen={isOpen} size="2xl" onClose={onClose} scrollBehavior='inside'>
        {overlay}
        <ModalContent>
          <ModalHeader mr={'5px'} textAlign='center'>{detail.nama}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading fontSize='3xl' justifyContent={'center'}>
              <Text textAlign={'center'} lineHeight='2'>{detail.lafal}</Text>
            </Heading>
            <Text textAlign={'center'} mb='20px' fontStyle={'italic'}>{detail.transliterasi}</Text>
            <hr />
            <Heading fontSize={'l'} mt="20px">
              <Text color={'blue.400'}>Arti :</Text>
            </Heading>
            <Text>{detail.arti}</Text>
            <Heading fontSize={'l'} mt="20px">
              <Text color={'blue.400'}>Riwayat :</Text>
            </Heading>
            <Text mb={'20px'}>{detail.riwayat}</Text>
            <hr />
            <Text textAlign={'center'}>{detail.keterangan}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {
        loading &&
        <SimpleGrid mt={'20px'} columns={{ base: '1', md: '3' }} spacingX='40px' spacingY='20px'>
          {[...Array(9)].map((x, i) =>
            <Box p={5} shadow='md' key={i} borderWidth='1px' rounded={'md'}>
              <SkeletonText mt='4' noOfLines={4} spacing='4' />
            </Box>
          )}
        </SimpleGrid>
      }
      {
        error && <Error />
      }
    </Container >
  );
}

export default Doa;