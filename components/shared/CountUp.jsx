"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import CountUp from "react-countup";

const CountUpComponent = ({ start, end, duration, delay }) => {
  const controls = useAnimation();

  useEffect(() => {
    // Start the animation when the component is mounted
    controls.start({ opacity: 1, scale: 1 });
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={controls}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex justify-start items-center"
    >
      <CountUp
        start={start}
        end={end}
        duration={duration}
        delay={delay}
        easingFn={(t, b, c, d) => c * (t / d) + b}
        separator=","
        suffix="+"
      />
    </motion.div>
  );
};

export default CountUpComponent;
