import { Box } from "@chakra-ui/react";
import HeroSection from "./components/HeroSection/HeroSection";
import SearchSection from "./components/SearchSection/SearchSection";
import MostPickedSection from "./components/PickedSection/MostPickedSection";
import { hotels } from "../../data/hotels";
import PopularChoiceSection from "./components/PopularChoicesSection/PopularChoicesSection";

export interface HomeProps {}

export default function Home() {
  return (
    <Box w="100%" maxW="1300px" m="auto">
      <HeroSection />
      <SearchSection />
      <MostPickedSection hotels={hotels} />
      <PopularChoiceSection hotels={hotels} />
    </Box>
  );
}
