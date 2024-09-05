'use client';
import React from 'react';
import { motion } from 'framer-motion';

const AnimationBg = ({ children }) => {
  return (
    <div className='relative'>
      <div className=''>
        <motion.div
          initial={{ x: '0%', y: '-100%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className='absolute !right-8 !-top-72 w-[600px] h-[1000px] bg-[#B38645] rounded-full will-change-transform'
        />

        <div className='relative z-20'>{children}</div>
      </div>
    </div>
  );
};

export default AnimationBg;
