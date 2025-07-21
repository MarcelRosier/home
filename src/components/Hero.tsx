import { motion } from "framer-motion";

export default function Hero() {
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
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 0.4,
          }}
        >
          <h1 className="text-4xl font-bold">Hey there!</h1>
          <p className="text-lg text-muted-foreground">
            I’m Marcel, a software engineer, researcher and photographer.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
