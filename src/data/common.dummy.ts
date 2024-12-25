import { HeaderNav } from "types/common";
import { FaHome, FaUsers, FaPhone } from "react-icons/fa";

export const headerNavDummy: HeaderNav[] = [
  {
    title: "Home",
    href: "/",
    children: [
      {
        title: "Most Picked",
        href: "/#most-picked",
      },
      {
        title: "Popular Choices",
        href: "/#popular-choices",
      },
      {
        title: "Directions",
        href: "/#directions",
      },
    ],
  },
  {
    title: "Hotels",
    href: "/hotels",
    icon: FaHome,
  },
  {
    title: "About",
    href: "/about",
    icon: FaUsers,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: FaPhone,
  },
];
