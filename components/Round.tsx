import React from "react";
import Select from "react-select";

const roundsList = [
  "Any Funding",
  "Angel",
  "Pre-Seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C",
  "Pre-IPO",
];

const options = roundsList.map((name) => {
  return { value: name, label: name };
});

interface RoundSelectProps {
  round: string;
  setRound: (value: string) => void;
}

export const RoundSelect: React.FC<RoundSelectProps> = ({
  round,
  setRound,
}) => {
  interface SelectedOption {
    value: string;
    label: string;
  }

  const handleChange = (selectedOption: SelectedOption | null) => {
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
