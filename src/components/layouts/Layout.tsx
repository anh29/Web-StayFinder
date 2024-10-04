import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { colors } from "theme";
import Header from "components/layouts/components/Header";
import Footer from "components/layouts/components/Footer";
import ScrollToAnchor from "components/shared/ScrollToAnchor";
import ScrollToTopButton from "components/shared/ScrollToTopButton";
import ArrowDown from "components/elements/ArrowDown";
import SearchIconButton from "./SearchIcon";
import SearchModal from "pages/search/components/SearchModal";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <SearchIconButton onOpen={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} size="lg" closeOnOverlayClick={false}>
        <ModalOverlay bg="rgba(0, 0, 0, 0.5)" backdropFilter="blur(5px)" />
        <ModalContent
          borderRadius="md"
          boxShadow="xl"
          transition="transform 0.3s ease, opacity 0.3s ease"
          bgGradient="linear(to-r, teal.400, blue.500)"
        >
          <ModalHeader color="white">Search for Hotels</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody >
            <SearchModal onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
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
