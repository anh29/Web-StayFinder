import { Box } from "@chakra-ui/react";
import HeroSection from "./components/HeroSection/HeroSection";
import MostPickedSection from "./components/PickedSection/MostPickedSection";
import PopularChoiceSection from "./components/PopularChoicesSection/PopularChoicesSection";
import MapDirection from "components/layouts/components/Map/MapDirection";
import BannerArrowDown from "components/elements/BannerArrowDown";

export interface HomeProps {}

export default function Home() {
  return (
    <Box w="100%" maxW="1300px" m="auto">
      <HeroSection />
      <BannerArrowDown
        arrowCount={3}
        colors={["#0ab3c4", "#ADD8E6"]}
        arrowProps={{ w: "2rem", h: "2rem" }}
        wrapperProps={{ display: { base: "flex", md: "block" }, justifySelf: "center", mt: { base: "0", md: "2rem"} }}
      />
      <MostPickedSection />
      <BannerArrowDown
        arrowCount={3}
        colors={["#0ab3c4", "#ADD8E6"]}
        arrowProps={{ w: "2rem", h: "2rem" }}
        wrapperProps={{ display: { base: "flex", md: "block" }, justifySelf: "center", mt: "2rem" }}
      />
      <PopularChoiceSection />
      <Box display={{ base: "none", md: "block" }}>
      <BannerArrowDown
        arrowCount={3}
        colors={["#0ab3c4", "#ADD8E6"]}
        arrowProps={{ w: "2rem", h: "2rem" }}
        wrapperProps={{ display: { base: "flex", md: "block" }, justifySelf: "center", mt: "2rem" }}
      />
      <MapDirection />
      </Box>
    </Box>
  );
}
