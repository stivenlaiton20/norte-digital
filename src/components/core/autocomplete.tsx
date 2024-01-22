"use client";

import React, { useState, ChangeEvent, KeyboardEvent, useRef } from "react";
import { Input, InputProps } from "./input";

interface AutocompleteProps extends InputProps {
  suggestions: string[];
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  suggestions,
  ...inputProps
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredSuggestions(filtered);
    setSelectedSuggestion(inputValue);
    setDropdownVisible(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSelectedSuggestion(suggestion);
    setDropdownVisible(false);
  };

  const handleInputBlur = () => {
    setDropdownVisible(false);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setDropdownVisible(false);
    }
  };

  return (
    <div className="relative">
      <Input
        {...inputProps}
        value={selectedSuggestion}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        ref={inputRef}
      />
      {isDropdownVisible && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { Autocomplete };
