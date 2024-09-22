import { Box, Button, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { FiUser, FiCamera, FiMapPin } from "react-icons/fi";
import ElementEffectEntering from "components/shared/effect/ElementEffectEntering";
import { banner } from "assets/images";
import StatBox from "components/elements/StatBox";

export interface HeroSectionProps {}

export default function HeroSection(props: HeroSectionProps) {
  return (
    <Box
      id="#"
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="space-between"
      px={{ base: "1.5rem", md: "2rem" }}
      py={{ base: "2rem", md: "3rem" }}
      gap={{ base: "1.5rem", md: "2rem" }}
    >
      {/* Text Section */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems={{ sm: "center", md: "flex-start" }}
        maxW={{ base: "100%", md: "500px" }}
        gap="1.5rem"
      >
        <ElementEffectEntering
          motionProps={{
            initial: { y: "150%" },
            animate: { y: 0, transition: { duration: 1, delay: 0.2 } },
          }}
        >
          <Heading
            as="h1"
            fontSize={{ base: "1.75rem", sm: "2rem", md: "3rem" }}
            fontWeight="extrabold"
            color="#152C5B"
            textAlign={{ base: "center", md: "left" }}
          >
            Forget Busy Work, Start Next Vacation
          </Heading>
        </ElementEffectEntering>

        <ElementEffectEntering
          motionProps={{
            initial: { scale: 0 },
            animate: { scale: 1, transition: { duration: 1, delay: 0.4 } },
          }}
        >
          <Text
            fontSize={{ base: "1rem", sm: "1.25rem", md: "1.5rem" }}
            fontWeight="light"
            color="#B0B0B0"
            textAlign={{ base: "center", md: "left" }}
          >
            We provide what you need to enjoy your holiday with family. Time to
            make another memorable moment.
          </Text>
        </ElementEffectEntering>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems={"center"}
        >
          <ElementEffectEntering
            motionProps={{
              initial: { scale: 0 },
              animate: { scale: 1, transition: { duration: 1, delay: 0.6 } },
            }}
          >
            <Button
              borderRadius="full"
              bg="#06B3C4"
              color="white"
              px="6"
              fontSize="1.25rem"
              boxShadow="md"
              textAlign={"center"}
              alignSelf={{ base: "center", md: "flex-start" }}
            >
              Show More
            </Button>
          </ElementEffectEntering>
        </Box>

        {/* Statistics Section */}
        <ElementEffectEntering
          motionProps={{
            initial: { y: "150%" },
            animate: { y: 0, transition: { duration: 1, delay: 0.8 } },
          }}
        >
          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={{ base: "1.5rem", md: "3rem" }}
            mt={{ base: "1.5rem", md: "1rem" }}
            justifyContent={{ base: "center", md: "flex-start" }}
            w="100%"
            pt={{ md: "3rem" }}
            borderTop={{ md: "1px solid #E5E5E5" }}
          >
            <StatBox icon={FiUser} direction="row">
              <Text fontSize="1.25rem" fontWeight="bold" color="#152C5B">
                250
                <Text
                  as="span"
                  color={"#B0B0B0"}
                  fontWeight={"light"}
                  ml="0.5rem"
                >
                  user
                </Text>
              </Text>
            </StatBox>

            <StatBox icon={FiCamera} direction="row">
              <Text fontSize="1.25rem" fontWeight="bold" color="#152C5B">
                200
                <Text
                  as="span"
                  color={"#B0B0B0"}
                  fontWeight={"light"}
                  ml="0.5rem"
                >
                  treasure
                </Text>
              </Text>
            </StatBox>

            <StatBox icon={FiMapPin} direction="row">
              <Text fontSize="1.25rem" fontWeight="bold" color="#152C5B">
                10
                <Text
                  as="span"
                  color={"#B0B0B0"}
                  fontWeight={"light"}
                  ml="0.5rem"
                >
                  cities
                </Text>
              </Text>
            </StatBox>
          </Stack>
        </ElementEffectEntering>
      </Box>

      {/* Image Section */}
      <ElementEffectEntering
        motionProps={{
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { duration: 1, delay: 1.0 } },
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
          maxW={{ base: "100%", md: "600px" }}
          h={{ base: "300px", md: "400px" }}
        >
          {/* Frame behind the banner */}
          <Box
            position="absolute"
            top="30px"
            left="44px"
            display={{ sm: "none", md: "block" }}
            w={{ md: "500px" }}
            h={{ md: "400px" }}
            borderRadius="20% 5% 5% 5%"
            boxShadow="base"
            zIndex={0}
          />

          {/* Banner image */}
          <Image
            src={banner}
            borderRadius="20% 5% 5% 5%"
            boxShadow="lg"
            w={{ base: "300px", sm: "400px", md: "500px" }}
            h={{ base: "250px", sm: "350px", md: "400px" }}
            position="relative"
            zIndex={1}
          />
        </Box>
      </ElementEffectEntering>
    </Box>
  );
}
