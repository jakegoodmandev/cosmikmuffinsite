import { useState } from 'react';

const images = [
  { src: '/images/gallery/show-01.svg', alt: 'Live show 1' },
  { src: '/images/gallery/show-02.svg', alt: 'Live show 2' },
  { src: '/images/gallery/show-03.svg', alt: 'Live show 3' },
  { src: '/images/gallery/show-04.svg', alt: 'Live show 4' },
  { src: '/images/gallery/show-05.svg', alt: 'Live show 5' },
  { src: '/images/gallery/show-06.svg', alt: 'Live show 6' },
];

export default function GalleryGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-band-accent"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      {selectedImage && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedIndex(null)}
          onKeyDown={() => {}}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute right-4 top-4 text-white/70 hover:text-white"
            onClick={() => setSelectedIndex(null)}
            aria-label="Close lightbox"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white disabled:opacity-30"
            disabled={selectedIndex === 0}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(selectedIndex - 1);
            }}
            aria-label="Previous image"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white disabled:opacity-30"
            disabled={selectedIndex === images.length - 1}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(selectedIndex + 1);
            }}
            aria-label="Next image"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
