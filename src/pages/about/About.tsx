import { Box } from "@chakra-ui/react";
import FooterCTASection from "./components/FooterCTASection";
import HeroSection from "./components/HeroSection";
import MissionSection from "./components/MissionSection";
import TeamSection from "./components/TeamSection";
import VisionValuesSection from "./components/VisionValuesSection";


const AboutPage = () => {
  return (
    <Box w="full" maxW="1300px" mx="auto" py={10} px={4} bg={"white"}>
      <HeroSection />
      <MissionSection />
      <VisionValuesSection />
      <TeamSection />
      <FooterCTASection />
    </Box>
  );
};

export default AboutPage;
