import { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import {
  HiOutlineCalendar,
  HiOutlineDeviceMobile,
  HiOutlineLocationMarker,
  HiOutlineMail,
} from "react-icons/hi";

interface personalCardIcon {
  label?: string;
  name?: IconType;
  link?: string;
}

export const PERSONAL_INFOS = [
  {
    icon: HiOutlineMail,
    label: "EMAIL",
    value: "harrytruong1772@gmail.com",
  },
  {
    icon: HiOutlineDeviceMobile,
    label: "PHONE",
    value: "(+84) 906 464 186",
  },
  {
    icon: HiOutlineCalendar,
    label: "DOB",
    value: "July 17, 2002",
  },
  {
    icon: HiOutlineLocationMarker,
    label: "LOCATION",
    value: "Danang, Vietnam",
  },
];

export const personalCardIcons: personalCardIcon[] = [
  {
    label: "Github",
    name: FaGithub,
    link: "https://github.com/HarryxDD"
  },
  {
    label: "Instagram",
    name: FaInstagram,
    link: "https://www.instagram.com/ameeexd/"
  },
  {
    label: "Facebook",
    name: FaFacebookF,
    link: "https://www.facebook.com/HarryxDDD/"
  },
  {
    label: "Linkedin",
    name: FaLinkedin,
    link: "https://www.linkedin.com/in/harryxd/"
  },
];
