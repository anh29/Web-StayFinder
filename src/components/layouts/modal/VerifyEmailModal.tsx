import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  VStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { getCookie, setCookie } from "utils/cookie";
import { sendVerifyEmail, verifyCode } from "api/authService";

const VerifyEmailModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [emailSent, setEmailSent] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const statusemail = getCookie("statusemail");
    const email = getCookie("email");
    if (statusemail !== "verify" && !!email) {
      onOpen();
    }
  }, [onOpen]);

  const handleSendEmail = async () => {
    try {
      
      const response = await sendVerifyEmail({ email: getCookie("email") });
      if (response.success) {
        setEmailSent(true);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Unable to send email");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await verifyCode({ email: getCookie("email"), code });

      if (response.success) {
        setSuccess(true);
        setCookie("statusemail", "verify", 1);
        setTimeout(() => onClose(), 2000); 
      } else {
        throw new Error(response.message || "Invalid code");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Verify Your Email</ModalHeader>
        <ModalBody>
          {!emailSent ? (
            <VStack spacing={4}>
              <Text>Please verify your email to proceed.</Text>
              <Button colorScheme="blue" onClick={handleSendEmail}>
                Send Verification Email
              </Button>
              {error && <Text color="red.500">{error}</Text>}
            </VStack>
          ) : (
            <VStack spacing={4}>
              <Text>
                A 6-digit verification code has been sent to your email. Please enter it below.
              </Text>
              <Input
                placeholder="Enter verification code"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                textAlign="center"
              />
              <Button colorScheme="blue" onClick={handleVerifyCode}>
                Submit Code
              </Button>
              {error && <Text color="red.500">{error}</Text>}
              {success && <Text color="green.500">Email verified successfully!</Text>}
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} variant="ghost">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VerifyEmailModal;
