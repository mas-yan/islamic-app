import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
  Text,
  useColorModeValue,
  SimpleGrid,
  Button,
  Container
} from '@chakra-ui/react';
import { ArrowRightIcon, ArrowLeftIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import './style.css';

function Location() {
  return (
    <div>
      asas
    </div>
  )
}

function Jadwal() {
  const [jadwal, setJadwal] = useState([])
  const [kota, setKota] = useState('')
  const [day, setDay] = useState()

  const { isOpen, onOpen, onClose } = useDisclosure()


  const getJadwal = async () => {

    const date = new Date()
    const now = day ? day : `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    const response = await fetch(
      `https://api.myquran.com/v1/sholat/jadwal/1301/${now}`
    );
    const data = await response.json();
    setJadwal(data.data.jadwal)
    setKota(data.data.lokasi)
  }

  const setNow = (newDate) => {
    const date = newDate || new Date();
    setDay(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate())
  };

  const getNextDate = () => {
    const now = day ? day : new Date()
    const currentDayInMilli = new Date(now).getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const previousDayInMilli = currentDayInMilli + oneDay
    const previousDate = new Date(previousDayInMilli)
    setNow(previousDate)
  }

  const getPreviousDate = () => {
    const now = day ? day : new Date()
    const currentDayInMilli = new Date(now).getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const previousDayInMilli = currentDayInMilli - oneDay
    const previousDate = new Date(previousDayInMilli)
    setNow(previousDate)
  }
  useEffect(() => {
    getJadwal()
  }, [day])
  return (
    <Box className="widget-header" textAlign={'center'} position={'absolute'} bottom='0' bg={useColorModeValue('gray.100', 'gray.600')} color='black'>
      <Heading mt={2} fontSize={{ base: 'sm', md: 'xl' }}>
        <Text display={'inline'} color={useColorModeValue('blue.700', 'white')} fontWeight='bold'>Waktu Sholat Daerah {kota}</Text>
        <button onClick={onOpen}><TriangleDownIcon color={useColorModeValue('blue.700', 'white')} pb={{ base: 1, md: 2 }} pl='1' w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} /></button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Location />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Heading>
      <button style={{ margin: '0 10px' }} onClick={() => { getPreviousDate() }}><ArrowLeftIcon color={useColorModeValue('blue.700', 'white')} /></button>
      <Text display={'inline'} color={useColorModeValue('blue.700', 'white')}>{jadwal.tanggal}</Text>
      <button style={{ margin: '0 10px' }} onClick={() => { getNextDate() }}><ArrowRightIcon color={useColorModeValue('blue.700', 'white')} /></button>
      <SimpleGrid columns={3} p='1.5' spacing='5px' border={1}>
        <Box shadow={'base'} bg={useColorModeValue('white', 'gray.300')} borderRadius={'md'}>
          <Text color={'black'} fontWeight='bold'>Imsak</Text>
          <Heading fontSize={'2xl'}>
            <Text color={'blue.700'} fontWeight='bold'>{jadwal.imsak}</Text>
          </Heading>
        </Box>
        <Box shadow={'base'} bg={useColorModeValue('white', 'gray.300')} borderRadius={'md'}>
          <Text color={'black'} fontWeight='bold'>Subuh</Text>
          <Heading fontSize={'2xl'}>
            <Text color={'blue.700'} fontWeight='bold'>{jadwal.subuh}</Text>
          </Heading>
        </Box>
        <Box shadow={'base'} bg={useColorModeValue('white', 'gray.300')} borderRadius={'md'}>
          <Text color={'black'} fontWeight='bold'>Dzuhur</Text>
          <Heading fontSize={'2xl'}>
            <Text color={'blue.700'} fontWeight='bold'>{jadwal.dzuhur}</Text>
          </Heading>
        </Box>
        <Box shadow={'base'} bg={useColorModeValue('white', 'gray.300')} borderRadius={'md'}>
          <Text color={'black'} fontWeight='bold'>Ashar</Text>
          <Heading fontSize={'2xl'}>
            <Text color={'blue.700'} fontWeight='bold'>{jadwal.ashar}</Text>
          </Heading>
        </Box>
        <Box shadow={'base'} bg={useColorModeValue('white', 'gray.300')} borderRadius={'md'}>
          <Text color={'black'} fontWeight='bold'>Maghrib</Text>
          <Heading fontSize={'2xl'}>
            <Text color={'blue.700'} fontWeight='bold'>{jadwal.maghrib}</Text>
          </Heading>
        </Box>
        <Box shadow={'base'} bg={useColorModeValue('white', 'gray.300')} borderRadius={'md'}>
          <Text color={'black'} fontWeight='bold'>Isya</Text>
          <Heading fontSize={'2xl'}>
            <Text color={'blue.700'} fontWeight='bold'>{jadwal.isya}</Text>
          </Heading>
        </Box>
      </SimpleGrid>
    </Box >
  )
}

function Home() {
  return (
    <div>
      <div className="header">
        <Box color={'white'} pt={{ base: '30', md: '50px' }} pb='120px' bg={useColorModeValue('gray.700', '')} width="100%">
          <Heading textAlign={'center'}>
            <Text>Islamic App</Text>
          </Heading>
          <Text textAlign={'center'}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, impedit!
          </Text>
        </Box>
        <Jadwal />
      </div >
      <Box py={'80px'} pt={{ base: '130px', md: '180px' }} bg={useColorModeValue('white', 'gray.700')} width="100%">
        <Container maxW={'7xl'}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut repellendus obcaecati sequi, similique doloremque cumque expedita rem ratione dignissimos enim sapiente perferendis placeat minus vitae rerum nihil dicta quam tempore dolor delectus necessitatibus magni qui beatae. Cum dolorum doloremque commodi suscipit cumque velit sed corrupti nulla exercitationem numquam expedita, sint illo vel culpa cupiditate maiores eligendi eaque saepe quasi ab esse aliquam! Voluptatum quaerat minima libero culpa, accusantium reiciendis quis explicabo sit doloremque nulla. Voluptatem assumenda repellendus atque. Eos nisi suscipit similique. Fugiat modi rerum quaerat eligendi, nesciunt blanditiis exercitationem eum rem magni qui eaque ut quisquam eos alias inventore corrupti iste mollitia aliquam officiis beatae, corporis doloremque hic quidem! Debitis voluptatum sed quia quo blanditiis, similique quas illum labore eos, voluptates exercitationem vitae provident reiciendis beatae possimus molestias repellendus veritatis ipsam! Cupiditate nesciunt a molestiae expedita eos maxime accusamus culpa ducimus consequatur sunt quaerat numquam perferendis explicabo animi, sint sapiente alias odit. Delectus accusamus praesentium ipsum molestiae non alias placeat facilis aspernatur odit exercitationem ea unde atque, veniam illo sed, esse, rem aliquam laboriosam iure. Ipsa amet incidunt delectus commodi eaque alias modi? Labore modi beatae ratione aliquid laudantium repellendus amet dolorem, mollitia libero quam doloribus. Illo omnis iste provident laboriosam quisquam nostrum, temporibus natus distinctio tenetur modi in mollitia sed expedita quos, aliquid ipsum quibusdam? Itaque explicabo officiis tempora omnis minus sapiente perferendis repellendus dolorum, vitae sed sunt? Aliquam, totam optio illum unde omnis repellendus ipsum corrupti, dolor, inventore animi exercitationem accusamus tenetur distinctio sint suscipit excepturi ea reiciendis commodi vero. Saepe hic expedita assumenda culpa nihil a doloremque, quae aliquid laboriosam laborum sed corrupti, quisquam voluptatibus velit ea tempore dicta molestiae enim magni tenetur, quod porro delectus. Numquam nisi reprehenderit earum atque alias! Tenetur earum et, repudiandae consequuntur delectus nihil deserunt ullam aut minus. Eligendi repellat nisi aliquam, tempore repellendus recusandae aut deleniti magni est cum rem eos sunt nostrum sequi, explicabo iusto porro nihil distinctio commodi maxime vitae quae corrupti? Beatae, vero! Eius quas velit hic, unde, aliquid a consectetur laboriosam corrupti reiciendis delectus ipsa ducimus saepe quibusdam laborum possimus maiores doloremque beatae. Id autem quibusdam in ut? Assumenda reprehenderit distinctio rerum quibusdam commodi maiores consequuntur consequatur? Autem unde incidunt dicta praesentium quasi ratione laborum quia obcaecati libero error, totam vel quisquam voluptas laboriosam earum, nisi velit iure minus perspiciatis deleniti doloribus beatae eos officia vitae? Quas recusandae deleniti aliquam tempore porro dolorem pariatur ipsa, magni ad, quae consequatur iure officiis? Est aut doloribus reiciendis optio accusamus aliquid, id impedit sint beatae iure qui sed doloremque dolore praesentium soluta. Ipsa quibusdam iusto quidem architecto animi fuga nihil reprehenderit quam quod repellendus, quis incidunt beatae in sunt, numquam assumenda enim error ut. Voluptate id corporis accusantium dolores quae culpa harum debitis nobis, quo dignissimos, ducimus ipsa? Dolores magnam saepe libero, est sit dolorem iste fuga quia minima laboriosam accusamus necessitatibus adipisci illo molestias voluptas quos maiores veniam, reprehenderit fugit non delectus optio totam. Animi aperiam soluta tempore expedita quod reiciendis ex reprehenderit totam sed voluptas deleniti numquam assumenda, omnis doloremque minus! Illo doloremque consectetur enim nobis cumque, similique voluptatibus id, assumenda magnam, obcaecati dolore quod pariatur tenetur alias recusandae labore nihil quibusdam expedita repellat. Porro voluptate explicabo laborum natus architecto ullam voluptatibus reprehenderit nobis repudiandae praesentium ipsam nulla sed fuga voluptatum itaque laudantium maiores, eligendi exercitationem corrupti harum cupiditate dolorum sunt tempora ea! Deserunt accusantium hic culpa, tenetur enim nihil velit perspiciatis laborum laboriosam vero dolore. Praesentium incidunt ratione iste. Eius incidunt nam quisquam recusandae deleniti animi reprehenderit explicabo impedit iure, quis ipsam amet voluptatem repudiandae ratione, optio itaque corporis. Explicabo facilis enim obcaecati laborum incidunt vero voluptate repellat, suscipit ipsa rem praesentium culpa veniam nobis assumenda reprehenderit necessitatibus sunt. Perferendis pariatur qui alias nemo incidunt tenetur non, expedita ex blanditiis? Nesciunt laborum, quisquam aut beatae tenetur hic reprehenderit eius sed sequi dicta corrupti optio aspernatur odit ipsa asperiores nobis magnam tempora repellendus eum illum? Ex rerum saepe quasi. Cumque iste sit laborum quos, magni perferendis! Labore necessitatibus aut impedit est incidunt, facilis assumenda, ullam excepturi sit cum ea iste. Quos facilis maiores voluptate, error voluptatibus, tempora repellendus unde quae provident porro esse incidunt sequi? Dolorem earum ipsum pariatur. Ad ratione alias sapiente repellat molestiae nisi dicta, dolores, iure perferendis amet fugiat odio quod. Eius, enim libero! Esse repellat rem voluptates cumque quos soluta sit ipsam quod? Beatae cupiditate labore esse tempore incidunt ipsum maxime saepe perferendis dicta! Earum iure quis natus reiciendis repellendus labore dolorum eaque hic illum dolore non doloremque deleniti aut aliquam ducimus quo, quidem explicabo sequi? Explicabo, inventore exercitationem nihil sapiente perferendis autem dolor doloremque iusto nisi, pariatur molestias atque velit numquam praesentium eaque quod at suscipit quaerat aspernatur, quam expedita veniam impedit? Quae alias possimus quo commodi ex odit inventore maxime repellendus iusto reprehenderit fugiat ea hic nisi laborum aliquam, saepe debitis aspernatur nulla totam harum eum cum? Eaque distinctio, sed consectetur quae perspiciatis error magnam tempore qui, enim suscipit voluptatem vel dolorum a fugiat minima sapiente reiciendis autem at numquam amet, neque illo! Blanditiis ullam aliquam minus in nulla odio debitis incidunt amet dignissimos voluptate iusto itaque ratione magnam, ipsam repudiandae, consequuntur quis culpa velit. Cumque, alias vero! Adipisci aliquam sunt blanditiis tempora corporis repellendus qui, rerum, doloribus provident facilis maiores nihil tenetur nobis, in rem reiciendis? Autem, sit maiores soluta dolorem aliquam sapiente. Sequi, id. Quam, in, adipisci quod similique aliquid, eveniet et quae maxime tenetur temporibus optio fuga. Fugiat tenetur voluptas cumque? Cupiditate veniam dolor illo, earum ipsa laudantium odio sequi quaerat recusandae magni odit consectetur repudiandae atque quasi incidunt itaque eum, libero ex culpa inventore ad eveniet a. Ipsa soluta quia delectus dolor aliquid commodi voluptates, dignissimos ex modi fugit porro iusto, quis ad rem maiores unde, inventore veniam. Officia neque numquam natus eum libero, ab nisi adipisci laborum inventore autem ex dicta rem tempora explicabo id veritatis similique illo nihil perspiciatis. Numquam tenetur expedita sunt in quas quisquam commodi, optio aperiam molestiae, officia a inventore nam cum illum cupiditate magnam distinctio quaerat ullam accusantium dicta voluptatibus fugit.
        </Container>
      </Box>
    </div >
  )
}

export default Home;