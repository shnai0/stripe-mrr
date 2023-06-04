import React from "react";
import Select from "react-select";

const sectorsList = [
  "All Industries",
  "Technology",
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

export const SectorSelect = ({ sector, setSector }) => {
  const handleChange = (selectedOption) => {
    setSector(selectedOption ? selectedOption.value : "");
  };

  const selectedSector = options.find((option) => option.value === sector);

  const defaultOption = options.find(
    (option) => option.value === "All Industries"
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
