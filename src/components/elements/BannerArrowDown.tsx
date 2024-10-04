import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Icon } from "@chakra-ui/react";
import ElementEffectEntering from "components/shared/effect/ElementEffectEntering";

export interface BannerArrowDownProps {}

export default function BannerArrowDown(props: BannerArrowDownProps) {
  return (
    <ElementEffectEntering
      motionProps={{
        initial: { y: "5rem" },
        animate: { y: 0, transition: { duration: 1 } },
      }}
    >
      <Box display="flex" flexDirection="column" gap="0.5rem" justifyContent="center" alignItems="center" my="5rem">
        <Icon as={TriangleDownIcon} w="3rem" h="3rem" color="main" />
        <Icon as={TriangleDownIcon} w="3rem" h="3rem" color="main" opacity="0.5" />
        <Icon as={TriangleDownIcon} w="3rem" h="3rem" color="main" opacity="0.1" />
      </Box>
    </ElementEffectEntering>
  );
}