import { motion, easeOut } from "motion/react";
import ResearchEntry from "./ResearchEntry"; // ensure this is also a .tsx file

type Props = {
  entries: any;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

export default function ResearchList({ entries }: Props) {
  return (
    <section className="mt-10">
      <motion.h2
        className="mb-8 text-3xl"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
      >
        Research
      </motion.h2>
      <div className="flex flex-col space-y-8 2xl:space-y-12">
        {entries.map((entry, index) => (
          <motion.div
            variants={fadeInUp}
            key={index}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
          >
            <ResearchEntry researchEntry={entry} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
