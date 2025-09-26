import { motion, easeOut } from "motion/react";
import { FaCameraRetro } from "react-icons/fa";
import photos from "@/data/photos.json";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import Gallery from "./Gallery";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

function Photography() {
  // Always show 3 rows: 3 images on mobile (1 col), 6 on tablet (2 cols), 9 on desktop (3 cols)
  // We'll use 9 as the max since that covers all breakpoints with 3 rows
  const displayedPhotos = photos.slice(0, 6);

  return (
    <section className="mt-10">
      <motion.h2
        className="mb-8 text-3xl"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="flex items-center">
          <FaCameraRetro className="mr-2" />
          Photography
        </div>
      </motion.h2>
      <Gallery photos={displayedPhotos} />

      <motion.div
        className="mt-6 flex justify-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <a href={"/photography"}>
              <Button variant="outline">
                <span>...</span>
                <span className="sr-only">More</span>
              </Button>
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex items-center gap-x-1 text-sm">
              Checkout all my photos
            </p>
          </TooltipContent>
        </Tooltip>
      </motion.div>
    </section>
  );
}

export default Photography;
