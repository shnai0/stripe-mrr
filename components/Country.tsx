import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { getNames } from "country-list";

const Select = dynamic(() => import("react-select"), { ssr: false });

const countryList = getNames();

const options = countryList.map((name) => {
  return { value: name, label: name };
});

export const CountrySelect = ({ country, setCountry, slug }) => {
  const handleChange = (selectedOption: { value: any }) => {
    setCountry(selectedOption.value);
  };

  useEffect(() => {
    if (slug) {
      const slugCountry = options.find(
        (option) => option.value.toLowerCase() === slug.toLowerCase()
      );
      if (slugCountry) setCountry(slugCountry.value);
    }
  }, [slug]);

  const selectedCountry = options.find((option) => option.value === country);

  const defaultOption = options.find(
    (option) => option.value === "United States of America"
  );

  return (
    <Select
      options={options}
      onChange={handleChange}
      defaultValue={defaultOption}
      value={selectedCountry}
    />
  );
};
