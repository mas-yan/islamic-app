import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react'
function About() {
  return (
    <div>
      <SimpleGrid columns={{ base: '1', md: '4' }} spacingX='40px' spacingY='20px'>
        <Box p={5} shadow='md' borderWidth='1px' rounded={'md'}>
          <Heading fontSize='xl'>Lorem ipsum dolor sit amet.</Heading>
          <Text mt={4}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, tenetur.</Text>
        </Box>
      </SimpleGrid>

    </div >
  )
}

export default About;