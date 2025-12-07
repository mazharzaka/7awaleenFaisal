import React, { useState, useEffect, useCallback } from "react";

const CustomSelect = ({ options, onChange, width = "200px" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  useEffect(() => {
    setSelectedOption(options[0]);
  }, [options, toggleDropdown]);

  const handleOptionClick = (option) => {
    console.log(option);
    setSelectedOption(option);
    onChange(option);
    toggleDropdown();
  };

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event) {
      if (!event.target.closest(".dropdown-content")) {
        toggleDropdown();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="dropdown-content custom-select relative"
      style={{ width: width }}
    >
      <div
        className={`select-selected whitespace-nowrap ${
          isOpen ? "select-arrow-active" : ""
        }`}
        onClick={toggleDropdown}
      >
        {selectedOption.label}
      </div>
      {isOpen && (
        <div className={`select-items `}>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`select-item ${
                selectedOption === option ? "same-as-selected" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
