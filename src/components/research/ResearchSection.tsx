import { motion } from "motion/react";
import ResearchEntry from "./ResearchEntry"; // ensure this is also a .tsx file

type Props = {
  entries: any;
};

export default function ResearchList({ entries }: Props) {
  return (
    <section className="mt-10">
      <h2 className="mb-8 text-3xl">Research</h2>
      <div className="flex flex-col space-y-8 2xl:space-y-12">
        {entries.map((entry, index) => (
          <motion.div>
            <ResearchEntry researchEntry={entry} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
