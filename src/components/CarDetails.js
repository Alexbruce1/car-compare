import React, { useEffect, useState } from "react";

const CarDetails = ({ make, model, year }) => {
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(
          `https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${year}&make=${make}&model=${model}`
        );
        const textData = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(textData, "text/xml");
        const vehicleList = Array.from(xml.getElementsByTagName("menuItem"));

        if (vehicleList.length === 0) {
          console.warn("No vehicle options found.");
          setLoading(false);
          return;
        }

        const vehicleId = vehicleList[0].getElementsByTagName("value")[0].textContent;

        const detailsResponse = await fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/${vehicleId}`);
        const detailsText = await detailsResponse.text();
        const detailsXml = parser.parseFromString(detailsText, "text/xml");

        setCarData({
          mpg: detailsXml.getElementsByTagName("comb08")[0]?.textContent || "N/A",
          fuelType: detailsXml.getElementsByTagName("fuelType")[0]?.textContent || "N/A",
          transmission: detailsXml.getElementsByTagName("trany")[0]?.textContent || "N/A",
          engineSize: detailsXml.getElementsByTagName("displ")[0]?.textContent || "N/A",
        });
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (make && model && year) {
      fetchCarDetails();
    }
  }, [make, model, year]);

  return (
    <div>
      <h2>Details for {year} {make} {model}</h2>
      {loading ? (
        <p>Loading specs...</p>
      ) : carData ? (
        <div>
          <p><strong>MPG:</strong> {carData.mpg}</p>
          <p><strong>Fuel Type:</strong> {carData.fuelType}</p>
          <p><strong>Transmission:</strong> {carData.transmission}</p>
          <p><strong>Engine Size:</strong> {carData.engineSize}L</p>
        </div>
      ) : (
        <p>No details found.</p>
      )}
    </div>
  );
};

export default CarDetails;