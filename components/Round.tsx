import React from "react";
import Select from "react-select";

const roundsList = [
  "Any Funding Round",
  "Angel",
  "Pre-Seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C",
  "And More",
];

const options = roundsList.map((name) => {
  return { value: name, label: name };
});

export const RoundSelect = ({ round, setRound }) => {
  const handleChange = (selectedOption) => {
    setRound(selectedOption ? selectedOption.value : "");
  };

  const selectedRound = options.find((option) => option.value === round);

  // Default option to be selected
  const defaultOption = options.find((option) => option.value === "Seed");

  return (
    <Select
      options={options}
      onChange={handleChange}
      value={selectedRound}
      defaultValue={defaultOption} // Add this line
      placeholder="Select a round"
    />
  );
};
