interface DogImageProps {
  imageUrl: string;
  breedName: string;
  loading: boolean;
  error: string | null;
}

function DogImage({ imageUrl, breedName, loading, error }: DogImageProps) {
  return (
    <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-2xl bg-orange-100">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={breedName}
          className={`h-full w-full object-cover transition duration-300 ${
            loading ? "scale-105 opacity-40 blur-sm" : "opacity-100"
          }`}
        />
      )}

      {imageUrl && !loading && !error && (
        <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {breedName}
        </span>
      )}

      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-orange-50/70 text-slate-600">
          <span className="h-9 w-9 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />
          <span className="text-sm font-medium">Fetching a good dog...</span>
        </div>
      )}

      {!loading && !imageUrl && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-orange-400">
          <span className="text-5xl">🐕</span>
          <span className="text-sm font-medium">No image yet</span>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-red-50 px-6 text-center text-red-600">
          <span className="text-4xl">⚠️</span>
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}
    </div>
  );
}

export default DogImage;
