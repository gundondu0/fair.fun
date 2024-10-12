import { useState } from "react";

interface CreateImageUploadProps {
  onImageUpload: (file: File) => void;
  error?: string;
}

export default function CreateImageUpload({
  onImageUpload,
  error,
}: CreateImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-theme-text mb-1 transition-colors duration-300">
        Coin Image *
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-theme-bg text-theme-text transition-colors duration-300 ${
          error ? "border-red-500" : "border-theme-text/30"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="mt-2 w-32 h-32 object-cover rounded-md"
        />
      )}
    </div>
  );
}
