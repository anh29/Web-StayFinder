import { Box, SystemProps } from "@chakra-ui/react";
import { MotionProps, motion, useInView } from "framer-motion";
import { useRef } from "react";

export interface ElementEffectEnteringProps {
  children?: React.ReactNode;
  motionProps: MotionProps;
  containerProps?: SystemProps;
  elementProps?: SystemProps;
}

export default function ElementEffectEntering({ children, motionProps, containerProps, elementProps }: ElementEffectEnteringProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const firstRender = useRef<boolean>(true);
  return (
    <Box ref={ref} {...containerProps}>
      {isInView && (
        <Box
          as={motion.div}
          {...(motionProps as any)}
          initial={
            firstRender.current &&
            (motionProps.variants ? motionProps.initial : { opacity: 0, ...(typeof motionProps.initial === "object" ? motionProps.initial : {}) })
          }
          animate={
            motionProps.variants ? motionProps.animate : { opacity: 1, ...(typeof motionProps.animate === "object" ? motionProps.animate : {}) }
          }
          {...elementProps}
          onAnimationComplete={() => (firstRender.current = false)}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}
