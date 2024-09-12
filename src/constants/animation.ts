import { Variants } from "framer-motion";

export const drawerVars: Variants = {
  initial: {
    right: "-100vw",
  },
  animate: {
    right: 0,
    transition: {
      duration: 0.3,
      ease: [0.32, 0, 0.39, 0],
    },
  },
  exit: {
    right: "-100vw",
    transition: {
      duration: 0.3,
      ease: [0.32, 0, 0.39, 0],
      delay: 0.3,
    },
  },
};

export const drawerItemVars: Variants = {
  initial: {
    marginLeft: 30,
    opacity: 0,
  },
  animate: {
    marginLeft: 0,
    opacity: 1,
  },
  exit: {
    marginLeft: 30,
    opacity: 0,
  },
};

export const loadingContainerVars: Variants = {
  initial: {
    right: "-100vw",
    // opacity: 0,
  },
  animate: {
    right: 0,
    // opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.32, 0, 0.39, 0],
    },
  },
  exit: {
    right: "-100vw",
    // opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.32, 0, 0.39, 0],
      delay: 0.6,
    },
  },
};

export const loadingContentVars: Variants = {
  initial: {
    marginLeft: 30,
    opacity: 0,
  },
  animate: {
    marginLeft: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.32, 0, 0.39, 0],
      delay: 0.2,
    },
  },
  exit: {
    marginLeft: 30,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.32, 0, 0.39, 0],
      delay: 0.3,
    },
  },
};
