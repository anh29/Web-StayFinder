import { IconType } from "react-icons";

export type HeaderNav = {
  title: string;
  href: string;
  icon?: IconType;
  children?: HeaderNav[];
};
