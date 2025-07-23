import { motion, easeOut } from "motion/react";
import ResearchEntry from "./ResearchEntry"; // ensure this is also a .tsx file

type Props = {
  entries: any;
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

export default function ResearchList({ entries }: Props) {
  return (
    <section className="mt-10">
      <h2 className="mb-8 text-3xl">Research</h2>
      <motion.div
        className="flex flex-col space-y-8 2xl:space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {entries.map((entry, index) => (
          <motion.div variants={itemVariants} key={index}>
            <ResearchEntry researchEntry={entry} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
