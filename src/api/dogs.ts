import type { BreedListResponse, RandomImageResponse } from "../types";

const BASE_URL = "https://dog.ceo/api";

export async function fetchBreeds(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/breeds/list/all`);

  if (!response.ok) {
    throw new Error("Could not load the breed list.");
  }

  const data = (await response.json()) as BreedListResponse;
  return Object.keys(data.message).sort();
}

export async function fetchRandomDogImage(breed: string): Promise<string> {
  const endpoint = breed
    ? `${BASE_URL}/breed/${encodeURIComponent(breed)}/images/random`
    : `${BASE_URL}/breeds/image/random`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Could not load a dog image.");
  }

  const data = (await response.json()) as RandomImageResponse;
  return data.message;
}

export function formatBreedName(breed: string): string {
  if (!breed) return "Random breed";

  return breed
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
