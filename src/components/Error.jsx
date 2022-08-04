import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription, Center, HStack, Spacer, useColorModeValue
} from '@chakra-ui/react'
const Error = () => {
  return (
    <Center h='500px'>
      <Alert
        status='error'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='200px'
        rounded={'md'}
      >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize='lg'>
          Oops!
        </AlertTitle>
        <AlertDescription maxWidth='sm'>
          Sepertinya ada yang salah, coba lagi nanti ya
        </AlertDescription>
      </Alert>
    </Center>
  );
}

export default Error;
