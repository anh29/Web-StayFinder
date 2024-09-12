import { Box, Button, Heading, Icon, Image, List, ListIcon, ListItem, Stack } from "@chakra-ui/react";
import { gdg_cloud_icon, gdsc_dut_icon } from "assets/images";
import ElementEffectEntering from "components/shared/effect/ElementEffectEntering";
import { FaFacebook, FaGlobe, FaInstagram, FaLinkedin, FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import { handleScrollToTop } from "utils/common";

export interface FooterProps {}

export default function Footer(props: FooterProps) {
  return (
    <Box as="footer" w="full" bg="white" transition="all 0.3s ease-in-out" position="relative" p={{ base: "2rem", lg: "3rem" }} overflow="hidden">
      <Stack
        flexDirection={{ base: "column", lg: "row" }}
        alignItems="flex-start"
        justifyContent="space-between"
        w="100%"
        maxW="1300px"
        m="auto"
        gap="2rem"
      >
        <ElementEffectEntering
          motionProps={{
            initial: { y: "100%" },
            animate: { y: 0, transition: { duration: 0.5 } },
          }}
          containerProps={{
            mt: "0 !important",
          }}
        >
          <Box display="flex" flexDirection="column" gap="1.5rem">
            <Heading as="h4" pb="0.25rem" borderBottom="2px solid" borderColor="google.yellow" w="max-content" fontSize="1.25rem">
              Theo dõi chúng tôi tại
            </Heading>
            <List display="flex" alignItems="center" gap="1rem">
              <ListIcon as={FaFacebook} w="2rem" h="2rem" />
              <ListIcon as={FaInstagram} w="2rem" h="2rem" />
              <ListIcon as={FaLinkedin} w="2rem" h="2rem" />
              <ListIcon as={FaGlobe} w="2rem" h="2rem" />
            </List>
          </Box>
        </ElementEffectEntering>

        <ElementEffectEntering
          motionProps={{
            initial: { y: "100%" },
            animate: { y: 0, transition: { duration: 0.75 } },
          }}
          containerProps={{
            mt: "0 !important",
          }}
        >
          <Box display="flex" flexDirection="column" gap="1.5rem">
            <Heading as="h4" pb="0.25rem" borderBottom="2px solid" borderColor="google.yellow" w="max-content" fontSize="1.25rem">
              Đơn vị tổ chức
            </Heading>
            <List display="flex" flexDirection="column" gap="1rem">
              <ListItem>
                <Image src={gdsc_dut_icon} alt="GDSC DUT" filter="invert(100%)" />
              </ListItem>
              <ListItem>
                <Image src={gdg_cloud_icon} alt="GDG CLOUD" filter="invert(100%)" />
              </ListItem>
            </List>
          </Box>
        </ElementEffectEntering>

        <ElementEffectEntering
          motionProps={{
            initial: { y: "100%" },
            animate: { y: 0, transition: { duration: 0.75 } },
          }}
          containerProps={{
            mt: "0 !important",
          }}
        >
          <Box display="flex" flexDirection="column" gap="1.5rem">
            <Heading as="h4" pb="0.25rem" borderBottom="2px solid" borderColor="google.yellow" w="max-content" fontSize="1.25rem">
              Liên hệ
            </Heading>
            <List display="flex" flexDirection="column" gap="1rem">
              <ListItem display="flex" alignItems="center" gap="1rem">
                <Icon as={FaPhone} transform="rotate(95deg)" w="1.5rem" h="1.5rem" />
                <Heading as="p" fontSize="1.125rem">
                  Phùng Thị Ánh (StayFinder): 0123 456 789
                </Heading>
              </ListItem>
              
              <ListItem display="flex" alignItems="center" gap="1rem">
                <Icon as={IoMdMail} w="1.5rem" h="1.5rem" />
                <Heading as="p" fontSize="1.125rem">
                  partnership.stayfinder@gmail.com
                </Heading>
              </ListItem>
            </List>
          </Box>
        </ElementEffectEntering>
      </Stack>
      <Button onClick={handleScrollToTop} color="black" position="absolute" bottom="1rem" right="1rem">
        <ElementEffectEntering
          motionProps={{
            animate: { opacity: 1, transition: { duration: 0.75 } },
          }}
        >
          <Link to="/">Logo StayFinder</Link>
        </ElementEffectEntering>
      </Button>
    </Box>
  );
}
