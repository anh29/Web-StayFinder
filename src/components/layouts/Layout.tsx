import { Box } from "@chakra-ui/react";
import React from "react";
import { colors } from "theme";
import Header from "components/layouts/components/Header";
import Footer from "components/layouts/components/Footer";
import ScrollToAnchor from "components/shared/ScrollToAnchor";
import ScrollToTopButton from "components/shared/ScrollToTopButton";
import ArrowDown from "components/elements/ArrowDown";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Box>
      <ScrollToAnchor />
      <Header />
      <Box pt="5rem" textColor={colors.black} px="2rem">
        {children}
      </Box>
      <Footer />
      <Box position="fixed" bottom="12%" left="50%" transform="translateX(-50%)">
        <ArrowDown />
      </Box>
      <ScrollToTopButton />
    </Box>
  );
};

export default Layout;
