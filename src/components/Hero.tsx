import { motion, easeOut } from "framer-motion";

import type { Variants } from "framer-motion";

export default function Hero() {
  const textItem: Variants = {
    hidden: { x: -100, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const textWrapper: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3, // Stagger children
      },
    },
  };

  return (
    <div className="flex items-center">
      {/* Avatar */}
      <motion.img
        src="/images/avatar.webp"
        alt="Avatar"
        className="rounded-full w-32 h-32 object-cover mr-4"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Vertical Line */}
      <motion.div
        className="border-r border-accent-foreground h-32"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0,
        }}
        style={{ transformOrigin: "center" }}
      />

      {/* Text wrapper (acts as mask) */}
      <div className="relative overflow-hidden">
        {/* Sliding Text */}
        <motion.div
          className="flex flex-col space-y-2 pl-4"
          variants={textWrapper}
          initial="hidden"
          animate="show"
        >
          <motion.h1 className="text-4xl font-bold" variants={textItem}>
            Hey there!
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground"
            variants={textItem}
          >
            I’m Marcel, a software engineer, researcher and photographer.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
