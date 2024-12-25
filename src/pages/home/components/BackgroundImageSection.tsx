import { Box, Heading, Image } from "@chakra-ui/react";

const BackgroundImage: React.FC = () => (
  <Box flex="1" display={{ base: 'none', md: 'block' }} position="relative">
    <Image
      src="https://img1.wsimg.com/isteam/ip/61f9aae4-8c96-479a-9c8a-4ce4304ab622/Front-exterior-view-of-Ella-Resort.jpg/:/cr=t:0%25,l:22.72%25,w:42.18%25,h:100%25/rs=w:730,h:973,cg:true"
      alt="Background"
      h="calc(100vh + 22rem)"
      w="100%"
      objectFit="cover"
      opacity={0.7}
    />
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      bg="rgba(255, 255, 255, 0.65)"
      p="24rem 14rem"
      borderRadius="lg"
      textAlign="center"
      boxShadow="lg"
    >
      <Heading size="lg" color="gray.700" fontWeight="bold">
        Stay<span style={{ color: '#38B2AC' }}>Finder</span>
      </Heading>
    </Box>
  </Box>
);

export default BackgroundImage;