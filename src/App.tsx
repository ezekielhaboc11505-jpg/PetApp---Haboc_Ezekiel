import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import BreedSelect from "./components/BreedSelect";
import DogImage from "./components/DogImage";
import { fetchBreeds, fetchRandomDogImage, formatBreedName } from "./api/dogs";

function App() {
  const [dogList, setDogList] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadImage = useCallback(async (breed: string) => {
    setLoading(true);
    setError(null);

    try {
      const url = await fetchRandomDogImage(breed);
      setImageUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        const breeds = await fetchBreeds();
        if (!ignore) {
          setDogList(breeds);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error ? err.message : "Could not load the breed list."
          );
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (dogList.length > 0) {
      loadImage(selectedBreed);
    }
  }, [dogList, selectedBreed, loadImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">
      <main className="mx-auto w-full max-w-xl px-5 pb-16">
        <Header />

        <div className="card p-6 sm:p-7">
          <BreedSelect
            breeds={dogList}
            value={selectedBreed}
            disabled={loading}
            onChange={setSelectedBreed}
          />

          <DogImage
            imageUrl={imageUrl}
            breedName={
              selectedBreed
                ? formatBreedName(selectedBreed)
                : "Random breed"
            }
            loading={loading}
            error={error}
          />

          <button
            type="button"
            className="btn mt-5"
            onClick={() => loadImage(selectedBreed)}
            disabled={loading}
          >
            {loading ? "Loading..." : "Fetch Again"}
          </button>

          <p className="mt-4 text-center text-xs text-slate-400">
            Dog photos from{" "}
            <a
              href="https://dog.ceo/dog-api/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-orange-500 hover:underline"
            >
              dog.ceo
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
