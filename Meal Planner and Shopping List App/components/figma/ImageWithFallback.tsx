import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithFallback = ({ src, alt, className }: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  // If the original src fails, we'll render a simple div as a fallback.
  // In a real app, you might want to show a default image.
  if (error) {
    return <div className={`bg-gray-200 ${className}`} title={alt}></div>;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export { ImageWithFallback };
