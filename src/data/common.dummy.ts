import { HeaderNav } from "types/common";

export const headerNavDummy: HeaderNav[] = [
  {
    title: "Về StayFinder",
    href: "/",
    children: [
      {
        title: "Proposal",
        href: "/",
      },
      {
        title: "Sổ tay thí sinh",
        href: "/",
      },
      {
        title: "Mentor Desk",
        href: "/",
      },
    ],
  },
  {
    title: "Thể lệ cuộc thi",
    href: "/rules",
  },
  {
    title: "Lịch trình",
    href: "/#schedules",
  },
  {
    title: "Đối tác",
    href: "/#sponsors",
  },
];
