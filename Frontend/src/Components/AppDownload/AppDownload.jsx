import React from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import './AppDownload.css';
import { motion } from 'framer-motion';

const STAGGER = 0.035;

// TextRoll component for AppDownload
const TextRoll = ({ children, className, center = false }) => {
  const letters = String(children).split('');

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={className}
      style={{
        display: 'inline-block',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {/* top row */}
      <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        {letters.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i;
          return (
            <motion.span
              key={`t1-${i}`}
              variants={{
                initial: { y: 0 },
                hovered: { y: '-100%' },
              }}
              transition={{ ease: 'easeInOut', delay }}
              style={{ display: 'inline-block' }}
            >
              {l}
            </motion.span>
          );
        })}
      </span>

      {/* bottom row */}
      <span
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          display: 'inline-block',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        {letters.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i;
          return (
            <motion.span
              key={`t2-${i}`}
              variants={{
                initial: { y: '100%' },
                hovered: { y: 0 },
              }}
              transition={{ ease: 'easeInOut', delay }}
              style={{ display: 'inline-block' }}
            >
              {l}
            </motion.span>
          );
        })}
      </span>
    </motion.span>
  );
};

function AppDownload() {
  return (
    <div className='app-download' id='app-download'>
      {/* Hover-scrolling text */}
      <div>
        <TextRoll center className="app-download-text">
          Better &nbsp;&nbsp;Experience&nbsp;&nbsp;&nbsp;Download&nbsp;&nbsp;&nbsp;Foodsy
        </TextRoll>
      </div>

      {/* App store buttons */}
      <div className='app-download-platforms'>
        <img src={assets.play_store} alt="play store" />
        <img src={assets.app_store} alt="app store" />
      </div>
    </div>
  );
}

export default AppDownload;
