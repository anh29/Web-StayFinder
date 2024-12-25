import { Box, BoxProps, useTheme } from "@chakra-ui/react";
import { motion } from "framer-motion";

export interface CardLayoutProps extends BoxProps {
  hoverEffect?: object;
  isSelected?: boolean;
}

export const CardLayout: React.FC<CardLayoutProps> = ({
  children,
  isSelected = false,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Box
      as={motion.div}
      borderWidth={isSelected ? 2 : 1}
      borderColor={isSelected ? theme.colors.blue[500] : theme.colors.gray[200]}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="base"
      {...props}
    >
      {children}
    </Box>
  );
};
