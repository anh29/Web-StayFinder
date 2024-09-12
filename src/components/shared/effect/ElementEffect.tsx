import { SystemProps } from "@chakra-ui/react";
import { MotionProps, motion } from "framer-motion";
import { HTMLAttributes, useRef } from "react";

export interface ElementEffectProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  motionProps: MotionProps;
  elementType?: React.ElementType;
  containerProps?: SystemProps;
}

export default function ElementEffect({ children, motionProps, containerProps, elementType = "div", ...rest }: ElementEffectProps) {
  const firstRender = useRef<boolean>(true);
  const DynamicMotionComponent = motion(elementType);
  return (
    <DynamicMotionComponent
      {...motionProps}
      initial={
        firstRender.current &&
        (motionProps.variants ? motionProps.initial : { opacity: 0, ...(typeof motionProps.initial === "object" ? motionProps.initial : {}) })
      }
      animate={motionProps.variants ? motionProps.animate : { opacity: 1, ...(typeof motionProps.animate === "object" ? motionProps.animate : {}) }}
      {...containerProps}
      {...rest}
      onAnimationComplete={() => (firstRender.current = false)}
    >
      {children}
    </DynamicMotionComponent>
  );
}
