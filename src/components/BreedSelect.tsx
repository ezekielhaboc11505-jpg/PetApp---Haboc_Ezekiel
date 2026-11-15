import { formatBreedName } from "../api/dogs";

interface BreedSelectProps {
  breeds: string[];
  value: string;
  disabled: boolean;
  onChange: (breed: string) => void;
}

function BreedSelect({ breeds, value, disabled, onChange }: BreedSelectProps) {
  return (
    <div>
      <label
        htmlFor="breed"
        className="mb-2 block text-sm font-semibold text-slate-600"
      >
        Select Breed
      </label>

      <div className="relative">
        <select
          id="breed"
          className="select pr-10"
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">Random breed</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {formatBreedName(breed)}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
          ▼
        </span>
      </div>
    </div>
  );
}

export default BreedSelect;
