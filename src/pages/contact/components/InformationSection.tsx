import { Box, Heading, Grid, Icon, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion';
import React from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
 
const MotionBox = motion(Box);

const InformationSection = () => {
  return (
    <>
    <Box width="100%">
          <Heading as="h2" fontSize="3xl" color="#06B3C4" textAlign="center" mb={6}>
            Get in Touch
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={10}>
            {[{
              icon: FaEnvelope,
              title: "Email Us",
              description: "contact@yourdomain.com"
            }, {
              icon: FaPhone,
              title: "Call Us",
              description: "+1 234 567 890"
            }, {
              icon: FaMapMarkerAlt,
              title: "Visit Us",
              description: "123 Your Street, City, Country"
            }].map((info, index) => (
              <MotionBox
                key={index}
                p={5}
                borderRadius="lg"
                boxShadow="lg"
                bg="#f7f7f7"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                border="1px solid #06B3C4"
                transition="0.3s"
              >
                <Icon as={info.icon} boxSize={10} color="#06B3C4" mb={4} />
                <Heading as="h3" fontSize="xl" color="#06B3C4">
                  {info.title}
                </Heading>
                <Text color="gray.600">{info.description}</Text>
              </MotionBox>
            ))}
          </Grid>
        </Box>
        </>
  )
}

export default InformationSection
