import React from "react";

const CarSelector = ({
  makes,
  models,
  selectedYear,
  selectedMake,
  setSelectedMake,
  selectedModel,
  setSelectedModel,
}) => {
  return (
    <div>
      <h2>Select a Car</h2>

      <select
        value={selectedMake}
        onChange={(e) => {
          const newMake = e.target.value;
          if (newMake !== selectedMake) {
            setSelectedMake(newMake);
            setSelectedModel("");
          }
        }}>
        <option value="">Select Make</option>
        {makes.map((make) => (
          <option key={make.Make_ID} value={make.Make_Name}>
            {make.Make_Name}
          </option>
        ))}
      </select>

      {selectedMake && (
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}>
          <option value="">Select Model (Year: {selectedYear})</option>
          {models.map((model) => (
            <option key={model.Model_ID} value={model.Model_Name}>
              {model.Model_Name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CarSelector;