import { HeaderNav } from "types/common";

export const headerNavDummy: HeaderNav[] = [
  {
    title: "Home",
    href: "/#",
    children: [
      {
        title: "Most Picked",
        href: "/#most-picked",
      },
      {
        title: "Popular Choices",
        href: "/#popular-choices",
      },
    ],
  },
  {
    title: "Hotels",
    href: "/hotels",
  },
  {
    title: "Rooms",
    href: "/rooms",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
