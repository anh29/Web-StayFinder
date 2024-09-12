import { Box, Heading } from "@chakra-ui/react";
import CountDown from "components/elements/CountDown";
import ElementEffectEntering from "components/shared/effect/ElementEffectEntering";

export interface HeroSectionProps {}

export default function HeroSection(props: HeroSectionProps) {
  return (
    <Box id="#" minH="calc(100vh - 5rem)" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="2rem" pt={{ base: "3rem", md: "0" }}>
        <ElementEffectEntering
          motionProps={{
            initial: { y: "150%" },
            animate: { y: 0, transition: { duration: 1, delay: 0.5 } },
          }}
        >
          <Heading as="h1" fontSize={{ base: "2rem", md: "3rem" }} fontWeight="bold">
            STAYFINDER
          </Heading>
        </ElementEffectEntering>
        <ElementEffectEntering
          motionProps={{
            initial: { scale: 0 },
            animate: { scale: 1, transition: { duration: 1, delay: 0.5 } },
          }}
        >
          <Heading as="p" textAlign="justify" fontSize={{ base: "1.25rem", md: "1.5rem" }} fontWeight="semibold" lineHeight="3rem">
            Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nisi rerum deleniti nemo? Ratione nihil maxime praesentium recusandae ab nisi molestias aspernatur est illum incidunt asperiores natus tempore, ad aut!
          </Heading>
        </ElementEffectEntering>

        <ElementEffectEntering
          motionProps={{
            initial: { y: "-50%" },
            animate: { y: 0, transition: { duration: 1, delay: 0.5 } },
          }}
        >
          <Box display="flex" flexDirection="column" gap="2rem" alignItems="center" justifyItems="center">
            <Heading as="h4" fontSize={{ base: "2rem", md: "3rem" }}>
              Coming Soon
            </Heading>
            <CountDown />
          </Box>
        </ElementEffectEntering>
      </Box>
    </Box>
  );
}
