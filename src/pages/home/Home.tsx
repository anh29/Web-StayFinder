import { Box } from "@chakra-ui/react";
import HeroSection from "./components/HeroSection";
import TopicSection from "./components/TopicSection";
import OutStandingFeaturesSection from "./components/OutstadingFeaturesSection";
import BenefitsSection from "./components/BenefitsSection";
import SchedulesSection from "./components/SchedulesSection";
import PrizeSection from "./components/PrizeSection";
import SponsorsSection from "./components/SponsorsSection";
import OrganizationsSection from "./components/OrganizationsSection";

export interface HomeProps {}

export default function Home(props: HomeProps) {
  return (
    <Box w="100%" maxW="1300px" m="auto">
      <HeroSection />
      <TopicSection />
      <OutStandingFeaturesSection />
      <BenefitsSection />
      <SchedulesSection />
      <PrizeSection />
      <SponsorsSection />
      <OrganizationsSection />
    </Box>
  );
}
