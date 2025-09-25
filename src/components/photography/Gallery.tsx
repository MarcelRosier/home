import { motion, easeOut } from "motion/react";

type Props = {
  photos: Array<{ url: string; title: string; location?: string; id?: string }>;
};

function Gallery({ photos }: Props) {
  const fadeIn = {
    hidden: { opacity: 0, y: 0 },
    show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: easeOut } },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
      {photos.map((photo, index) => {
        // Create a URL-friendly slug from the photo title or use index
        const photoSlug =
          photo.id ||
          photo.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") ||
          `photo-${index}`;

        return (
          <motion.div
            variants={fadeIn}
            key={index}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            <a
              href={`/photography/${photoSlug}`}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer block"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                loading={index < 6 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index < 3 ? "high" : "low"}
              />

              <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium text-white opacity-75">
                  {photo.location || photo.title}
                </p>
              </div>
            </a>
          </motion.div>
        );
      })}
    </div>
  );
}
export default Gallery;
