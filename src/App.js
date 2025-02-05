import React, { useState, useEffect } from "react";
import CarSelector from "./components/CarSelector";
import CarDetails from "./components/CarDetails";
import "./App.css";

const commonCarMakes = [
  "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Buick", "Cadillac", "Chevrolet", 
  "Chrysler", "Dodge", "Ferrari", "Fiat", "Ford", "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", 
  "Jaguar", "Jeep", "Kia", "Lamborghini", "Land Rover", "Lexus", "Lincoln", "Maserati", "Mazda", 
  "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan", "Porsche", "Ram", "Rolls-Royce", 
  "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo"
];

const App = () => {
  const currentYear = new Date().getFullYear();
  
  const [makes, setMakes] = useState([]);
  const [selectedYear, setSelectedYear] = useState(currentYear);  const [selectedMake, setSelectedMake] = useState("");
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json");
        const data = await response.json();

        const filteredMakes = data.Results.filter(make =>
          commonCarMakes.includes(make.Make_Name.trim().charAt(0).toUpperCase() + make.Make_Name.slice(1).toLowerCase())
        );

        setMakes(filteredMakes);
      } catch (error) {
        console.error("Error fetching makes:", error);
      }
    };

    fetchMakes();
  }, []);

  useEffect(() => {
    if (selectedMake && selectedYear) {
      const fetchModels = async () => {
        try {
          const response = await fetch(
            `https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${selectedYear}&make=${selectedMake}`
          );
          const textData = await response.text();
          const parser = new DOMParser();
          const xml = parser.parseFromString(textData, "text/xml");
          const modelItems = Array.from(xml.getElementsByTagName("menuItem"));

          const modelList = modelItems.map(item => ({
            Model_ID: item.getElementsByTagName("value")[0].textContent,
            Model_Name: item.getElementsByTagName("text")[0].textContent,
          }));

          setModels(modelList);
        } catch (error) {
          console.error("Error fetching models:", error);
        }
      };
      fetchModels();
    }
  }, [selectedMake, selectedYear]);

  return (
    <div className="App">
      <h1>Car Compare</h1>

      <label>Choose a Year: </label>
      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        {[...Array(30)].map((_, i) => {
          const year = 2025 - i;
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>

      <CarSelector
        makes={makes}
        models={models}
        selectedYear={selectedYear}
        selectedMake={selectedMake}
        setSelectedMake={setSelectedMake}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}/>

      {selectedModel && <CarDetails make={selectedMake} model={selectedModel} year={selectedYear} />}
    </div>
  );
};

export default App;