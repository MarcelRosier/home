import { Button } from "@/components/ui/button";
import {
  IoLocation,
  IoArrowBack,
  IoArrowForward,
  IoCalendar,
} from "react-icons/io5";
import photos from "@/data/photos.json";

type Photo = {
  id: string;
  title: string;
  url: string;
  location: string;
  date: string;
};

type Props = {
  photo: Photo;
};

export default function PhotoDetail({ photo }: Props) {
  // Find current photo index for navigation
  const currentIndex = photos.findIndex((p) => p.id === photo.id);
  const prevPhoto = photos[currentIndex - 1];
  const nextPhoto = photos[currentIndex + 1];

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back Navigation */}
      <div className="mb-6">
        <a href="/photography">
          <Button variant={"link"}>
            <IoArrowBack className="mr-1" />
            Gallery
          </Button>
        </a>
      </div>

      {/* Photo Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Image */}
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-lg shadow-xl">
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-auto object-contain max-h-[80vh] transition-opacity duration-300"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>

        {/* Photo Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{photo.title}</h1>
            <p className="text-lg text-muted-foreground flex items-center">
              <IoLocation className="mr-2" />
              {photo.location}
            </p>
            <p className="text-lg text-muted-foreground flex items-center">
              <IoCalendar className="mr-2" />
              {photo.date}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <a href={photo.url} target="_blank" rel="noopener noreferrer">
              <Button className="w-full">View Full Resolution</Button>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation to Next/Previous Photos */}
      <div className="mt-12 flex justify-between items-center">
        <div>
          {prevPhoto && (
            <a href={`/photography/${prevPhoto.id}`}>
              <Button variant="link" className="flex-col items-start">
                <div className="flex items-center">
                  <IoArrowBack className="mr-2" /> Previous
                </div>
                <span className="text-sm text-muted-foreground">
                  {prevPhoto.title}
                </span>
              </Button>
            </a>
          )}
        </div>

        <div>
          {nextPhoto && (
            <a href={`/photography/${nextPhoto.id}`}>
              <Button variant="link" className="flex-col items-end">
                <div className="flex items-center">
                  Next
                  <IoArrowForward className="ml-2" />
                </div>
                <span className="text-sm text-muted-foreground">
                  {nextPhoto.title}
                </span>
              </Button>
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
