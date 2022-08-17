import {
  Table,
  Thead,
  Tbody,
  Box,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Container,
  Heading,
  useColorModeValue,
  useDisclosure,
  Text,
  Skeleton,
  Spinner
} from '@chakra-ui/react'
import { ArrowRightIcon, ArrowLeftIcon, TriangleDownIcon, CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import City from './City';
import { useEffect, useState } from 'react';
import Adzan from "./../assets/sound/adzan.mp3";

const Jadwal = () => {
  // Memformat tanggal
  let d = new Date()
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = d.getFullYear()

  // get data from local
  const fromLocal = JSON.parse(localStorage.getItem('kota') || JSON.stringify({ value: '1301', label: 'KOTA JAKARTA' }));
  // use state for
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [day, setDay] = useState()
  const [value, setValue] = useState(fromLocal)
  const [city, setCity] = useState()
  const [date, setDate] = useState()
  const [month, setMonth] = useState()
  const [sholat, setSholat] = useState([])
  const [sholatDay, setSholatDay] = useState([])
  const [jam, setJam] = useState(null)
  const [today, setToday] = useState(Number(dd))
  const [time, setTime] = useState(null)
  const [next, setNext] = useState({ name: '-', countDown: 0 })

  // get data from api
  const getJadwal = async () => {
    // ddeclare date
    const date = new Date()
    const now = day ? `${day.split('/')[0]}/${day.split('/')[1]}` : `${date.getFullYear()}/${date.getMonth() + 1}`

    // fetch api
    try {
      let [perDay, perMonth] = await Promise.all([
        fetch(`https://api.myquran.com/v1/sholat/jadwal/${value.value}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`),
        fetch(`https://api.myquran.com/v1/sholat/jadwal/${value.value}/${now}`)
      ]);
      const resultDay = await perDay.json()
      const resultMonth = await perMonth.json()
      if (resultDay.status === true && resultMonth.status == true) {
        // set data
        setSholatDay(resultDay.data.jadwal)
        setSholat(resultMonth.data.jadwal)
      } else {
        setStatus(false)
      }
    }
    catch (err) {
      setStatus(false)
      console.log(err);
    };
  }

  // realtime time
  const getjam = () => {
    let date = new Date()
    let jam = (date.getHours() < 10 ? '0' : '') + date.getHours()
    let menit = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    let detik = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()
    setJam(`${jam}:${menit}:${detik}`)
  }

  // get month
  const getMonth = (newDate) => {
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const d = newDate || new Date();
    setMonth(`${monthNames[d.getMonth()]} - ${d.getFullYear()}`);
  }

  // get day
  const setNow = (newDate) => {
    const date = newDate || new Date();
    setDay(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate())
    getMonth(date)
  };

  // next month
  const getNextDate = () => {
    const now = day ? new Date(day) : new Date()
    const nextMonth = new Date(now.setMonth(now.getMonth() + 1))
    setNow(nextMonth)
  }

  // prev month 
  const getPreviousDate = () => {
    const now = day ? new Date(day) : new Date()
    const prevMonth = new Date(now.setMonth(now.getMonth() - 1))
    setNow(prevMonth)
  }

  // get city
  function handleChange(newValue) {
    setValue(newValue);
    setCity(newValue);
  }

  // get date
  const getDate = () => {
    const date = new Date()
    const day = ("0" + date.getDate()).slice(-2)
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear();
    setDate(year + "-" + month + "-" + day)
  }

  const getNext = () => {
    // next jadwal
    if (time) {
      const times = Object.values(time.jadwal)
        .map((v) => new Date(`${yyyy}-${mm}-${today}T${v}`).getTime())
        .map((v, i) => [Object.keys(time.jadwal)[i], v - Date.now()])
        .sort((a, b) => a[1] - b[1])
        .filter((v) => v[1] > 0)

      if (times.length === 0) {
        setToday(prevToday => prevToday + 1)
      } else {

        // Mengatur countdown
        const distance = times[0][1]
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        setNext({
          name: times[0][0],
          countDown: `${(hours < 10 ? '0' : '') + hours}:${(minutes < 10 ? '0' : '') + minutes
            }:${(seconds < 10 ? '0' : '') + seconds}`,
        })
      }
    }
  }

  // Fetch jadwal sholat
  useEffect(() => {
    // url
    const apiURL = `https://api.myquran.com/v1/sholat/jadwal/${value.value}/${yyyy}/${mm}/${today}`
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        delete data.data.jadwal['tanggal']
        delete data.data.jadwal['date']
        delete data.data.jadwal['dhuha']
        delete data.data.jadwal['terbit']
        setTime(data.data)
        getNext()

      })
      .catch((e) => {
        // setError(true)
        console.log(e);
      })

  }, [today, city])

  useEffect(() => {
    const intervalId = setInterval(() => {
      getNext()
      getjam()
    }, 1000)

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  })

  // Memutar audio adzan
  useEffect(() => {
    const adzan = document.getElementById('adzan')
    // document.body.onclick = () => {
    //   adzan.play()
    //   adzan.pause()
    // }

    const { name, countDown } = next
    // console.log(name);
    switch (name) {
      case 'subuh':
      case 'dzuhur':
      case 'ashar':
      case 'maghrib':
      case 'isya':
        if (countDown === '00:00:00') adzan.play()
        break

      default:
        break
    }
  })

  useEffect(() => {
    getMonth()
    getDate()
  }, [])

  useEffect(() => {
    getJadwal();
  }, [day, city])

  return (
    <Container maxW='container.xl' mt={{ md: 36, base: 40 }} mb={'30px'}>
      <div className="header">
        <Box className="widget-header widget-sholat" textAlign={'center'} position={'absolute'} bottom='0' bg={useColorModeValue('gray.100', 'gray.600')} color='black'>
          <Heading mt={4} fontSize={{ base: 'sm', md: 'xl' }}>
            <Text display={'inline'} color={useColorModeValue('blue.700', 'white')} fontWeight='bold'>Waktu Sholat Daerah <span onClick={onOpen} style={{ cursor: 'pointer' }}> {value.label}<TriangleDownIcon color={useColorModeValue('blue.700', 'white')} pb={{ base: 1, md: 2 }} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} /></span></Text>
            <City value={value} onChange={handleChange} isOpen={isOpen} onClose={onClose} />
          </Heading>
          <button style={{ margin: '0 10px' }} onClick={() => { getPreviousDate() }}><ArrowLeftIcon fontSize={{ base: 'xs', md: 'md' }} color={useColorModeValue('blue.700', 'white')} /></button>
          <Text display={'inline'} fontWeight='bold' fontSize={{ base: 'xs', md: 'md' }} color={useColorModeValue('blue.700', 'white')}>{month}</Text>
          <button style={{ margin: '0 10px' }} onClick={() => { getNextDate() }}><ArrowRightIcon fontSize={{ base: 'xs', md: 'md' }} color={useColorModeValue('blue.700', 'white')} /></button>
          <Box shadow={'base'} py='1.5' m='2.5' bg={useColorModeValue('white', 'gray.300')} borderRadius={'md'}>
            {jam ? <Text color={'black'} fontWeight='normal'><CalendarIcon mb='1.5' /> {sholatDay.tanggal}</Text> : <Skeleton height='5' w='130px' display={'inline-block'} mb='-1' />}
            <Heading fontSize={'2xl'} py='2'>
              {jam ? (<Text color={'blue.700'} fontWeight='bold'><TimeIcon mb={1.5} w={5} h={5} /> {jam}</Text>) : <Skeleton height='6' w='130px' display={'inline-block'} mb='-1' />}
            </Heading>
            {jam ? (<Box px='4'>
              Berikutnya <Text display={'inline'} fontWeight='bold'> {next.countDown} </Text>menuju <Text display={'inline'} fontWeight='bold'>{next.name}</Text> untuk daerah <Text display={'inline'} fontWeight='bold'>{value.label}</Text>
            </Box>) : <Skeleton height='6' w='130px' display={'inline-block'} mb='-1' />}
          </Box>
        </Box >
      </div >
      <Box p={5} shadow='md' borderWidth='1px' pt={{ md: 24, base: 28 }} rounded={'lg'} textAlign='center'>
        <Heading fontSize={'2xl'} mt='10'>
          <Text color={useColorModeValue('blue.700', 'white')}>kalender sholat khusus bulan {month}</Text>
        </Heading>
        <TableContainer mt={4} borderWidth='1px' rounded={'md'} shadow='sm'>
          <Table variant='simple' size={'md'}>
            <TableCaption> {sholat.length > 0 ? `kalender sholat khusus bulan ${month}` : <Spinner />}</TableCaption>
            <Thead>
              <Tr>
                <Th>Tanggal</Th>
                <Th>Imsak</Th>
                <Th>Subuh</Th>
                <Th>Terbit</Th>
                <Th>Dzuha</Th>
                <Th>Dzuhur</Th>
                <Th>Ashar</Th>
                <Th>Maghrib</Th>
                <Th>Isya</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                sholat.map((item, index) => (
                  <Tr key={index}>
                    <Td bg={date == item.date ? 'blue.400' : ''} color={date == item.date ? 'white' : ''}>{item.tanggal}</Td>
                    <Td bg={date == item.date ? 'blue.400' : ''} color={date == item.date ? 'white' : ''}>{item.imsak}</Td>
                    <Td bg={date == item.date ? 'blue.400' : ''} color={date == item.date ? 'white' : ''}>{item.subuh}</Td>
                    <Td bg={date == item.date ? 'blue.400' : ''} color={date == item.date ? 'white' : ''}>{item.terbit}</Td>
                    <Td bg={date == item.date ? 'blue.400' : ''} color={date == item.date ? 'white' : ''}>{item.dhuha}</Td>
                    <Td bg={date == item.date ? 'blue.400' : ''} color={date == item.date ? 'white' : ''}>{item.dzuhur}</Td>
                    <Td bg={date == item.date ? 'blue.400' : ''} color={date == item.date ? 'white' : ''}>{item.ashar}</Td>
                    <Td bg={date == item.date ? 'blue.400' : ''} color={date == item.date ? 'white' : ''}>{item.maghrib}</Td>
                    <Td bg={date == item.date ? 'blue.400' : ''} color={date == item.date ? 'white' : ''}>{item.isya}</Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <audio
        id="adzan"
        controls
        src={Adzan}
        style={{ display: "none" }}
        loading="lazy"
      />
    </Container >
  );
}

export default Jadwal;
