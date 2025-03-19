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
      <img 
        src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/icons/icon-poulp-dark.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpY29ucy9pY29uLXBvdWxwLWRhcmsuc3ZnIiwiaWF0IjoxNzQyMTAxMTcyLCJleHAiOjE3NzM2MzcxNzJ9.k5YYlUyFQyaIyv1itE6OgZmFSKteA_rd7DudUW1tVxk" 
        alt="Easter Egg" 
        className="w-32 h-32"
      />

      {showFlame && (
        <div className="absolute -bottom-44 left-1/2 transform -translate-x-1/2">
          <img 
            src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/extras/explosion.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJleHRyYXMvZXhwbG9zaW9uLmdpZiIsImlhdCI6MTc0MjEwMTMwNCwiZXhwIjoxNzczNjM3MzA0fQ.C6G7tCjF1P5c9bi7LAQkC9ciGGMlPUHsxk7SxPtJsRA"
            alt="Flame"
            className="w-72 h-72 rotate-90"
          />
        </div>
      )}
    </motion.div>
  );
}
