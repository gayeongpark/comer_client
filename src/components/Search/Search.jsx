import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function Search() {
  const [experiences, setExperiences] = useState([]);
  const location = useLocation();
  const { city } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { startDate, endDate } = location.state || {};
      try {
        const response = await fetch(`/searchExperience/${city}?startDate=${startDate}&endDate=${endDate}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };

    if (location.state) fetchData();
  }, [location, city]);

  return (
    <div className="bg-white">
      {/* UI code continues here */}
      <h1>Experience in {city}</h1>
      {/* Mapping experiences to display them */}
      {experiences.map((exp) => (
        <div key={exp._id}> {/* Assuming each experience has a unique _id */}
          <h3>{exp.title}</h3>
          <p>{exp.price}</p>
          {/* Further details */}
        </div>
      ))}
    </div>
  );
}

