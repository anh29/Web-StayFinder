import { Box, Button, Heading, Image, Stack, Text } from "@chakra-ui/react";
import ElementEffectEntering from "components/shared/effect/ElementEffectEntering";
import { banner } from "assets/images";
import StatBox from "components/elements/StatBox";
import { Link } from "react-router-dom";
import { ANIMATION_PROPS, STATISTICS } from "./constants";

export interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <Box
      id="hero-section"
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="space-between"
      px={{ base: "1.5rem", md: "2rem" }}
      pt={{ base: "2rem", md: "3rem" }}
      gap={{ base: "1.5rem", md: "2rem" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems={{ base: "center", md: "flex-start" }}
        maxW={{ base: "100%", md: "500px" }}
        gap="1.5rem"
      >
        <ElementEffectEntering motionProps={ANIMATION_PROPS.title}>
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

        <ElementEffectEntering motionProps={ANIMATION_PROPS.text}>
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

        <ElementEffectEntering motionProps={ANIMATION_PROPS.button}>
          <Button
            borderRadius="full"
            bg="#06B3C4"
            color="white"
            px="6"
            fontSize="1.25rem"
            boxShadow="md"
            _hover={{ bg: "#05A2B1" }}
            textAlign="center"
            alignSelf={{ base: "center", md: "flex-start" }}
            aria-label="Discover hotels"
          >
            <Link to="/hotels">Show More</Link>
          </Button>
        </ElementEffectEntering>

        <ElementEffectEntering motionProps={ANIMATION_PROPS.stats}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={{ base: "1.5rem", md: "3rem" }}
            mt={{ base: "1.5rem", md: "1rem" }}
            justifyContent={{ base: "center", md: "flex-start" }}
            w="100%"
            pt={{ md: "3rem" }}
            borderTop={{ md: "1px solid #E5E5E5" }}
          >
            {STATISTICS.map(({ icon: Icon, count, label }, index) => (
              <StatBox key={index} icon={Icon} direction="row">
                <Text fontSize="1.25rem" fontWeight="bold" color="#152C5B">
                  {count}
                  <Text
                    as="span"
                    color="#B0B0B0"
                    fontWeight="light"
                    ml="0.5rem"
                  >
                    {label}
                  </Text>
                </Text>
              </StatBox>
            ))}
          </Stack>
        </ElementEffectEntering>
      </Box>

      <ElementEffectEntering motionProps={ANIMATION_PROPS.image}>
        <Box
          display={{ base: "none", md: "flex" }}
          justifyContent="center"
          alignItems="center"
          position="relative"
          maxW={{ base: "100%", md: "600px" }}
          h={{ base: "300px", md: "400px" }}
        >
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

          <Image
            src={banner}
            alt="Vacation banner"
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
};

export default HeroSection;
