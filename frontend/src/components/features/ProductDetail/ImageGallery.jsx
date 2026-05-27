import { useState } from "react";

export default function ImageGallery({ images, productName }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Main Image */}
      <div className="relative bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden group">
        <img
          src={images[selectedImage]}
          alt={productName}
          className="w-full aspect-square object-cover group-hover:scale-105 transition duration-300"
        />
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-1 rounded text-sm">
            {selectedImage + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square rounded overflow-hidden border-2 transition ${
                selectedImage === index
                  ? "border-accent-500"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
              }`}
            >
              <img
                src={image}
                alt={`${productName} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
