import React from "react";
import { motion } from "framer-motion";



export default function ThreeDotsWave({color, size}) {
    const circleSize = size || '0.5rem'
    const loadingContainer = {
        width: "80%",
        height: "80%",
        display: "flex",
        alingItems: 'center',
        alingContent: 'center',
        justifyContent: "space-around"
      };

      const loadingCircle = {
        //display: "block",
        width: circleSize,
        height: circleSize,
        backgroundColor: color || 'white',
        borderRadius: "0.25rem"
      };

      const loadingContainerVariants = {
        start: {
          transition: {
            staggerChildren: 0.2
          }
        },
        end: {
          transition: {
            staggerChildren: 0.2
          }
        }
      };

      const loadingCircleVariants = {
        start: {
          y: "0%"
        },
        end: {
          y: "150%"
        }
      };

      const loadingCircleTransition = {
        duration: 0.5,
        yoyo: Infinity,
        ease: "easeInOut"
      };
  return (
    <motion.div
      style={loadingContainer}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </motion.div>
  );
}
