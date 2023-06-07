import React from "react";
import Select from "react-select";
import { Dispatch, SetStateAction } from "react";

const sectorsList = [
  "Any Industry",
  "Technology",
  "Open Source",
  "Finance",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Education",
  "Transportation",
  "Construction",
  "Real Estate",
  "Food & Beverages",
  "Energy",
];

const options = sectorsList.map((name) => {
  return { value: name, label: name };
});

interface SelectedOption {
  value: string;
  label: string;
}

interface SectorSelectProps {
  sector: string;
  setSector: Dispatch<SetStateAction<string>>;
}

export const SectorSelect: React.FC<SectorSelectProps> = ({
  sector,
  setSector,
}) => {
  const handleChange = (selectedOption: SelectedOption | null) => {
    setSector(selectedOption ? selectedOption.value : "");
  };

  const selectedSector = options.find((option) => option.value === sector);

  const defaultOption = options.find(
    (option) => option.value === "Any Industry"
  );

  return (
    <Select
      options={options}
      onChange={handleChange}
      value={selectedSector}
      defaultValue={defaultOption}
      placeholder="Select a sector"
    />
  );
};
