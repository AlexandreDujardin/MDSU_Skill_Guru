"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Rocket404() {
  const [isLaunched, setIsLaunched] = useState(false);
  const [showFlame, setShowFlame] = useState(false); // État pour afficher le GIF de la flamme

  const handleClick = () => {
    setShowFlame(true); // 🔥 Affiche la flamme au clic
    setIsLaunched(true); // 🚀 Déclenche le décollage

    setTimeout(() => {
      setShowFlame(false); // ❌ Cache la flamme après 3s
    }, 3000);
  };

  return (
    <motion.div
      className="relative cursor-pointer"
      initial={{ y: 0 }}
      animate={isLaunched ? { y: -500, opacity: 0 } : { x: [0, -3, 3, -3, 3, 0] }} // Tremblement avant lancement
      transition={isLaunched 
        ? { duration: 2, ease: "easeIn" } 
        : { repeat: Infinity, repeatType: "loop", duration: 0.3 }}
      onClick={handleClick}
    >
      {/* 🚀 Image du vaisseau */}
      <img 
        src="/images/icon-poulp-dark.svg" 
        alt="Rocket" 
        className="w-32 h-32"
      />

      {/* 🔥 GIF de la flamme (apparaît au clic et disparaît après 3s) */}
      {showFlame && (
        <div className="absolute -bottom-44 left-1/2 transform -translate-x-1/2">
          <img 
            src="/images/explosion.gif"
            alt="Flame"
            className="w-72 h-72 rotate-90"
          />
        </div>
      )}
    </motion.div>
  );
}
