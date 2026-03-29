import ImageCard from "./ImageCard";

export default function ImageGrid({ imageList }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {imageList.map((url, index) => (
        <ImageCard key={index} url={url} />
      ))}
    </div>
  );
}
