import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
  ModalFooter,
} from "@chakra-ui/react";
import { useState } from "react";

const AuthModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(true);

  const handleToggleAuth = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        {isLogin ? "Login" : "Sign Up"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isLogin ? "Login" : "Sign Up"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" />
            </FormControl>
            {!isLogin && (
              <FormControl mb={4}>
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" placeholder="Confirm your password" />
              </FormControl>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              {isLogin ? "Login" : "Sign Up"}
            </Button>
            <Button variant="ghost" onClick={handleToggleAuth}>
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
