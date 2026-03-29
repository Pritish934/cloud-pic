export default function ImageCard({ url }) {
  return (
    <div key={img._id} className="bg-white p-2 rounded-xl shadow">
      <img src={img.url} className="w-full h-32 object-cover rounded mb-2" />

      <div className="flex flex-col gap-2">
        {/* DOWNLOAD */}
        <button
          onClick={() => downloadImage(img.url)}
          className="w-full bg-pink-500 text-white py-1.5 rounded text-sm"
        >
          Download
        </button>

        {/* DELETE */}
        <button
          onClick={() => deleteImage(img._id, img.public_id)}
          className="w-full bg-red-500 text-white py-1.5 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
