import React from "react";
import { motion } from "framer-motion";
import "./ThreeDotsWave.css"



export default function ThreeDotsWave({color, size}) {
    const circleSize = size || '0.5rem'
    // const loadingContainer = {
    //     width: "80%",
    //     height: "80%",
    //     display: "flex",
    //     justifyContent: "space-around",
    //     alignContent: 'center'
    //   };

      const loadingCircle = {
        //display: "block",
        width: circleSize,
        height: circleSize,
        backgroundColor: color || 'white',
        borderRadius: "50%",
        alignSelf: 'center'
      };

      const loadingContainerVariants = {
        start: {
          transition: {
            staggerChildren: 0.3
          }
        },
        end: {
          transition: {
            staggerChildren: 0.3
          }
        }
      };

      const loadingCircleVariants = {
        start: {
          y: "-60%"
        },
        end: {
          y: "60%"
        }
      };

      const loadingCircleTransition = {
        duration: 0.8,
        repeat: 'Infinity',
        repeatType: "mirror",
        ease: "easeInOut"
      };
  return (
    <motion.div
      //style={loadingContainer}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
      className="tdw__container"
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
