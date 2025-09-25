import { motion, easeOut } from "motion/react";
import { FaCameraRetro } from "react-icons/fa";
import photos from "@/data/photos.json";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};
const fadeIn = {
  hidden: { opacity: 0, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 2.5, ease: easeOut } },
};

function Photography() {
  // Always show 3 rows: 3 images on mobile (1 col), 6 on tablet (2 cols), 9 on desktop (3 cols)
  // We'll use 9 as the max since that covers all breakpoints with 3 rows
  const displayedPhotos = photos.slice(0, 9);
  const hasMorePhotos = photos.length > 9;

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
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {displayedPhotos.map((photo, index) => (
          <motion.div
            variants={fadeIn}
            key={index}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-sm font-medium text-white opacity-75">
                {photo.location}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {hasMorePhotos && (
        <motion.div
          className="mt-6 flex justify-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <a href={"/photography"}>
                <Button variant="outline">
                  <span>🚧 More</span>
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
      )}
    </section>
  );
}

export default Photography;
