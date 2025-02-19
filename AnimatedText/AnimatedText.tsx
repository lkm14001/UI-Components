import { CustomValueType, motion, MotionValue, useInView } from "motion/react";
import { Theme, Typography } from "@mui/material";
import { SxProps } from "@mui/material";

interface AnimatedTextProps {
  /**Text to display */
  text: string;
  /**Style Props */
  sx?: SxProps<Theme>;
  /**style to scale */
  scaleStyle?:
    | string
    | number
    | CustomValueType
    | MotionValue<number>
    | MotionValue<string>
    | MotionValue<any>
    | undefined;
  /**className */
  className?: any;
  /**component type */
  component: string;
  /**Animate everytime the component is in view */
  whileInView?: boolean;
  /**Animate only once when the component is in view */
  once?: boolean;
}

const textAnimations = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const AnimatedText = ({
  text,
  sx,
  scaleStyle,
  className,
  component,
  whileInView,
  once,
}: AnimatedTextProps) => {
  const MotionText = motion.create(Typography<any>);

  return (
    <>
      <MotionText
        className={className}
        style={{ scale: scaleStyle ? scaleStyle : undefined }}
        component={component}
        transition={{ staggerChildren: 0.1 }}
        initial="initial"
        animate="animate"
        {...(whileInView && { whileInView: "animate" })}
        {...(once && { viewport: { once } })}
      >
        {text.split("").map((character, index) => (
          <MotionText
            component="span"
            sx={sx}
            style={{ display: "inline-block" }}
            key={index}
            variants={textAnimations}
          >
            {character === " " && <span>&nbsp;</span>}
            {character}
          </MotionText>
        ))}
      </MotionText>
    </>
  );
};

export default AnimatedText;