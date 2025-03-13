import React, { useEffect, useState, useRef } from 'react';

const Carousel = ({ images }) => {
  const carouselRef = useRef(null); // Ref for the carousel container
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current slide index
  const [slideWidth, setSlideWidth] = useState(0); // State to track the width of each slide

  // This effect is used to set the initial slide width and to handle resizing
  useEffect(() => {
    const updateSlideWidth = () => {
      if (carouselRef.current && carouselRef.current.children[0]) {
        setSlideWidth(carouselRef.current.children[0].offsetWidth); // Update slide width
      }
    };

    // Initial calculation of slide width
    updateSlideWidth();

    // Handle window resizing and update slide width
    window.addEventListener('resize', updateSlideWidth);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateSlideWidth);
    };
  }, [images]);

  // Function to go to the next slide
  const nextSlide = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1); // Update index
    }
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1); // Update index
    }
  };

  // Auto-slide functionality using an interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < images.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1); // Move to next slide
      } else {
        setCurrentIndex(0); // Reset to the first slide when we reach the last slide
      }
    }, 3000); // Set interval to auto-slide every 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* The container for the slides */}
      <div
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(${-slideWidth * currentIndex}px)`, // Move to the current slide based on the index
        }}
      >
        {/* Render each image */}
        {images.map((image, index) => (
          <div key={index} className="min-w-full">
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-auto" />
          </div>
        ))}
      </div>

      {/* Previous button */}
      <button
        onClick={prevSlide}
        disabled={currentIndex <= 0} // Disable when at the first slide
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        aria-label="Previous slide"
      >
        {/* Previous button SVG or text can go here */}
        ←
      </button>

      {/* Next button */}
      <button
        onClick={nextSlide}
        disabled={currentIndex >= images.length - 1} // Disable when at the last slide
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        aria-label="Next slide"
      >
        {/* Next button SVG or text can go here */}
        →
      </button>
    </div>
  );
};

export default Carousel;
