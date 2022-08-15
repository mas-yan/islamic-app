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
  Tooltip
} from '@chakra-ui/react'
import { ArrowRightIcon, ArrowLeftIcon, TriangleDownIcon, TimeIcon } from '@chakra-ui/icons';
import City from './City';
import { useEffect, useState } from 'react';

const Jadwal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [day, setDay] = useState()
  const fromLocal = JSON.parse(localStorage.getItem('kota') || JSON.stringify({ value: '1301', label: 'KOTA JAKARTA' }));
  const [value, setValue] = useState(fromLocal)
  const [city, setCity] = useState()
  const [date, setDate] = useState()
  const [month, setMonth] = useState()
  const [sholat, setSholat] = useState([])
  const [monthNow, setMonthNow] = useState()

  const getJadwal = async () => {
    const date = new Date()
    const now = day ? `${day.split('/')[0]}/${day.split('/')[1]}` : `${date.getFullYear()}/${date.getMonth() + 1}`
    const perMonth = await fetch(`https://api.myquran.com/v1/sholat/jadwal/${value.value}/${now}`)
    const data = await perMonth.json()
    if (data.status) {
      setSholat(data.data.jadwal)
    }
  }

  const getMonth = (newDate) => {
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const d = newDate || new Date();
    setMonth(`${monthNames[d.getMonth()]} - ${d.getFullYear()}`);
    setMonthNow(`${monthNames[new Date().getMonth()]} - ${new Date().getFullYear()}`)
  }

  const getMonthNow = () => {
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const date = new Date();
    setDay(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate())
    setMonth(`${monthNames[date.getMonth()]} - ${date.getFullYear()}`);
  }

  const setNow = (newDate) => {
    const date = newDate || new Date();
    setDay(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate())
    getMonth(date)
  };

  const getNextDate = () => {
    const now = day ? new Date(day) : new Date()
    const nextMonth = new Date(now.setMonth(now.getMonth() + 1))
    setNow(nextMonth)
  }

  const getPreviousDate = () => {
    const now = day ? new Date(day) : new Date()
    const prevMonth = new Date(now.setMonth(now.getMonth() - 1))
    setNow(prevMonth)
  }

  function handleChange(newValue) {
    setValue(newValue);
    setCity(newValue);
  }

  const getDate = () => {
    const date = new Date()
    const day = ("0" + date.getDate()).slice(-2)
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear();
    setDate(year + "-" + month + "-" + day)
  }

  useEffect(() => {
    getMonth()
    getDate()
  }, [])

  useEffect(() => {
    getJadwal();
  }, [day, city])

  return (
    <Container maxW='container.xl' my={'30px'}>
      <Box p={5} shadow='md' borderWidth='1px' rounded={'md'} textAlign='center'>
        <Heading mt={2} fontSize={{ base: 'sm', md: 'xl' }}>
          <Text display={'inline'} color={useColorModeValue('blue.700', 'white')} fontWeight='bold'>Waktu Sholat Daerah <span onClick={onOpen} style={{ cursor: 'pointer' }}> {value.label}<TriangleDownIcon color={useColorModeValue('blue.700', 'white')} pb={{ base: 1, md: 2 }} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} /></span></Text>
          <City value={value} onChange={handleChange} isOpen={isOpen} onClose={onClose} />
        </Heading>
        <button style={{ margin: '0 10px' }} onClick={() => { getPreviousDate() }}><ArrowLeftIcon fontSize={{ base: 'xs', md: 'md' }} color={useColorModeValue('blue.700', 'white')} /></button>
        <Text display={'inline'} fontWeight='bold' fontSize={{ base: 'xs', md: 'md' }} color={useColorModeValue('blue.700', 'white')}>{month}</Text>
        <button style={{ margin: '0 10px' }} onClick={() => { getNextDate() }}><ArrowRightIcon fontSize={{ base: 'xs', md: 'md' }} color={useColorModeValue('blue.700', 'white')} /></button>
        <Text cursor='pointer' fontSize={{ base: 'xs', md: 'md' }} onClick={() => getMonthNow()} display={monthNow != month ? 'inline' : 'none'} color={useColorModeValue('blue.700', 'white')}>
          <Tooltip label='Kembali ke waktu sekarang' style={{ margin: '0 10px' }}><TimeIcon /></Tooltip>
        </Text>

        <TableContainer mt={4} borderWidth='1px' rounded={'md'} shadow='sm'>
          <Table variant='simple' size={'md'}>
            <TableCaption>Imperial to metric conversion factors</TableCaption>
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
    </Container >
  );
}

export default Jadwal;
