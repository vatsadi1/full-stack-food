import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import img8 from "../../assets/frontend_assets/icons8-5-star-hotel-64.png"
import img2 from "../../assets/frontend_assets/icons8-fast-delivery-64.png"
import img3 from "../../assets/frontend_assets/icons8-ice-cream-94.png"
import img4 from "../../assets/frontend_assets/icons8-love-48.png"
import img5 from "../../assets/frontend_assets/icons8-noodles-94.png"
import img6 from "../../assets/frontend_assets/icons8-pizza-64.png"
import img7 from "../../assets/frontend_assets/icons8-salad-100.png"

// Character components
// Character components
// Character components
// Character components
// Character components
// Character components
// Character components
// Character components
const MovingIcon = ({ src, index, total, scrollYProgress }) => {
  const centerIndex = Math.floor(total / 2);
  const distance = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 1], [distance * 300, 0]); // horizontal movement
  const rotate = useTransform(scrollYProgress, [0, 1], [distance * 30, 0]); // rotation
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

  return (
    <motion.img
      src={src}
      alt="icon"
      style={{ x, rotate, scale }}
      className="w-20 h-20 object-cover rounded-lg"
    />
  );
};

const Skiper31 = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });

  const icons = [
  img2,img3,img4,img5,img6,img7,img8
  ];

  return (
    <ReactLenis root>
      <div
        ref={sectionRef}
        className="h-[200vh] flex flex-col items-center justify-center gap-32 bg-gray-100 p-10"
      >
         
        <div className="relative w-full flex justify-center overflow-hidden gap-10">
          {icons.map((icon, i) => (
            <MovingIcon
              key={i}
              src={icon}
              index={i}
              total={icons.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </ReactLenis>
  );
};

export default Skiper31;
