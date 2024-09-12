import { Box, keyframes } from "@chakra-ui/react";

const moveChevron = keyframes`
  25% { opacity: 1; }
  33.3% { opacity: 1; transform: translateY(2.5rem); }
  66.6% { opacity: 1; transform: translateY(3.2rem); }
  100% { opacity: 0; transform: translateY(4.5rem) scale(0.5); }
`;

const Chevron = ({ delay }: { delay: number }) => (
  <Box
    pos="absolute"
    w="2.5rem" // $base * 3.5
    h="0.4rem" // $base * 0.8
    opacity="0"
    transform="scale(0.3)"
    animation={`${moveChevron} 3s ease-out ${delay}s infinite`}
    _before={{
      content: `""`,
      pos: "absolute",
      top: "0",
      left: "0",
      h: "100%",
      w: "50%",
      bg: "black",
      transform: "skewY(30deg)",
    }}
    _after={{
      content: `""`,
      pos: "absolute",
      top: "0",
      right: "0",
      h: "100%",
      w: "50%",
      bg: "black",
      transform: "skewY(-30deg)",
    }}
  />
);

const ArrowDown = () => (
  <Box display="flex" justifyContent="center" alignItems="center" w="100%" pos="relative">
    <Chevron delay={0} />
    <Chevron delay={1} />
    <Chevron delay={2} />
  </Box>
);

export default ArrowDown;
