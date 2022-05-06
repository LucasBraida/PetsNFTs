import React from 'react'
import { motion } from 'framer-motion'

const MotionWrap = (Component, classNames) => function HOC(props) {
  return (
    <motion.div
      initial={{opacity: 0}}
        whileInView={{opacity: [0,0,1], y: [100,50,0]}}
        transition={{duration: 0.8}}
        className={`${classNames}`}>
            <Component props={props}/>
    </motion.div>
  )
}

export default MotionWrap
