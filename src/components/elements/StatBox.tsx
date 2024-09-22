import { Box } from "@chakra-ui/react";

export interface StatBoxProps {
  icon: React.ElementType;
  direction?: 'row' | 'column';
  children: React.ReactNode;
}

/* StatBox Component for displaying the icon and text */
const StatBox = ({ icon, direction = 'column', children }: StatBoxProps) => (
  <Box display="flex" flexDirection={direction} alignItems="center">
    <Box as={icon} fontSize="2rem" color="#06B3C4" mr={direction === 'row' ? "1rem" : "0"} />
    {children}
  </Box>
);

export default StatBox;
