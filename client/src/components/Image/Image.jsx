import React from "react";
import { Image } from "cloudinary-react";

export const ImageComponent = ({ publicId, alt }) => {
  return (
    <Image
      publicId={publicId}
      alt={alt}
      cloudName='dmhqzwtnd'
    />
  );
};
