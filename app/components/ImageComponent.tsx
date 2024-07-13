import React from 'react';

interface ImageComponentProps {
  imageBuffer: Buffer;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ imageBuffer }) => {
  // Convertir le Buffer en une URL de données (data URL)
  const dataURL = `data:image/jpeg;base64,${Buffer.from(imageBuffer).toString(
    "base64"
  )}`;

  return (
    <div className="w-full mx-auto h-40">
      <img src={dataURL} alt="article image" className="rounded-lg shadow-md h-full" />
    </div>
  );
};

export default ImageComponent;
