import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import OptimizedImage from "@/components/ui/OptimizedImage";
import photos from "@/data/photos.json";
import { useEffect } from "react";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import { IoArrowBack, IoCalendar, IoLocation } from "react-icons/io5";
import { RiGalleryView2 } from "react-icons/ri";

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
  const maxTextLinkLength = 25;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (nextPhoto) {
          window.location.href = `/photography/${nextPhoto.id}`;
        }
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (prevPhoto) {
          window.location.href = `/photography/${prevPhoto.id}`;
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back Navigation */}
      <div className="mb-6">
        <a href="/photography">
          <Button variant={"ghost"}>
            <RiGalleryView2 className="mr-1" />
            Gallery
          </Button>
        </a>
      </div>

      {/* Photo Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Image */}
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-lg shadow-xl">
            <OptimizedImage
              src={photo.url}
              alt={photo.title}
              className="h-auto w-auto"
              variant="medium"
              priority={true}
              blur={false}
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
              <Button variant="outline" className="w-full">
                View Full Resolution
              </Button>
            </a>
          </div>
        </div>
      </div>
      {/* Navigation to Next/Previous Photos */}
      <div className="mt-12 flex justify-between items-center">
        <div>
          {prevPhoto && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a href={`/photography/${prevPhoto.id}`}>
                  <Button variant="link" className="flex-col items-end">
                    <div className="flex items-center">
                      <BsArrowLeftSquare className="mr-2" />
                      Previous
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {prevPhoto.title.length > maxTextLinkLength
                        ? prevPhoto.title.substring(0, maxTextLinkLength) +
                          "..."
                        : prevPhoto.title}
                    </span>
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p className="flex items-center gap-x-1 text-sm">
                  <BsArrowLeftSquare />
                  View previous image
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        <div>
          {nextPhoto && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a href={`/photography/${nextPhoto.id}`}>
                  <Button variant="link" className="flex-col items-end">
                    <div className="flex items-center">
                      Next
                      <BsArrowRightSquare className="ml-2" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {nextPhoto.title.length > maxTextLinkLength
                        ? nextPhoto.title.substring(0, maxTextLinkLength) +
                          "..."
                        : nextPhoto.title}
                    </span>
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p className="flex items-center gap-x-1 text-sm">
                  View next image
                  <BsArrowRightSquare />
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </main>
  );
}
