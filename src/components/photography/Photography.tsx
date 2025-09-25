import { motion, easeOut } from "motion/react";
import photos from "@/data/photos.json";
import Gallery from "./Gallery";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

function Photography() {
  return (
    <section className="mt-10">
      <motion.h2
        className="mb-8 text-3xl"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="flex items-center">Gallery</div>
      </motion.h2>
      <Gallery photos={photos} />
    </section>
  );
}

export default Photography;
