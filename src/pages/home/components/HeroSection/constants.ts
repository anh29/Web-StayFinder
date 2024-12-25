import { FiCamera, FiMapPin, FiUser } from "react-icons/fi";

export const STATISTICS = [
  {
    icon: FiUser,
    count: "250+",
    label: 'user',
  },
  {
    icon: FiCamera,
    count: "200+",
    label: 'treasure',
  },
  {
    icon: FiMapPin,
    count: "10+",
    label: 'cities',
  },
];

export const ANIMATION_PROPS = {
  title: { initial: { y: "150%" }, animate: { y: 0 }, transition: { duration: 1, delay: 0.2 } },
  text: { initial: { scale: 0 }, animate: { scale: 1 }, transition: { duration: 1, delay: 0.4 } },
  button: { initial: { scale: 0 }, animate: { scale: 1 }, transition: { duration: 1, delay: 0.6 } },
  stats: { initial: { y: "150%" }, animate: { y: 0 }, transition: { duration: 1, delay: 0.8 } },
  image: { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1, delay: 1.0 } },
};