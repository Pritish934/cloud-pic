export default function UploadBox({ setImageUpload, uploadImage }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <input
        type="file"
        onChange={(e) => setImageUpload(e.target.files[0])}
        className="mb-3 w-full text-sm"
      />

      <button
        onClick={uploadImage}
        className="w-full bg-pink-500 text-white py-2 rounded-lg cursor-pointer"
      >
        Upload Image
      </button>
    </div>
  );
}
