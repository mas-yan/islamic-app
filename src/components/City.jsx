import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Select from 'react-select'
import { useEffect, useRef, useState } from 'react';

export default function City({ onChange, isOpen, onClose }) {
  // initial
  const initialRef = useRef(null)
  const fromLocal = JSON.parse(localStorage.getItem('kota') || JSON.stringify({ value: '1301', label: 'KOTA JAKARTA' }));

  const [kota, setKota] = useState(fromLocal)
  const [select, setSelect] = useState()
  const [lokasi, setLokasi] = useState();

  // if change city
  const handleChange = e => {
    setSelect(e)
    setKota(e)
    onChange(e);
    onClose()
  }

  // fetch date from api
  const getLokasi = async () => {
    const response = await fetch(
      `https://api.myquran.com/v2/sholat/kota/semua`
    );
    const data = await response.json();
    const option = []
    data.map((item) => {
      option.push({
        value: item.id,
        label: item.lokasi
      })
    })
    setLokasi(option)
  }

  useEffect(() => {
    getLokasi()
    localStorage.setItem('kota', JSON.stringify(kota))
  }, [select])

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ubah Lokasi Anda</ModalHeader>
          <ModalCloseButton />
          <ModalBody color={'black'}>
            <div>
              <Select
                placeholder='Cari Lokasi Anda ...'
                ref={initialRef}
                options={lokasi}
                onChange={(e) => {
                  handleChange(e)
                }} />
            </div>
            <Text display={'inline'} mt={'100px'} color={useColorModeValue('blue.700', 'white')} fontWeight='bold'>Lokasi Sekarang: {kota.label}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
