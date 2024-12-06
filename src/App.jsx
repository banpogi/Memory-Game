import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  const [clickedId, setClickedId] = useState([]);

  if (clickedId.length > 1) {
    console.log("cats array filled");

    const latestCatId = clickedId.length - 1;
    console.log(latestCatId, clickedId.length);

    for (let i = 0; i < clickedId.length - 1; i++) {
      if (clickedId[i] === clickedId[latestCatId]) {
        console.log("you clicked the same cat twice");
      }
    }
  }

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await axios.get(
          "https://api.thecatapi.com/v1/images/search?limit=10"
        );
        setCats(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cat images:", error);
      }
    };

    fetchCats();
  }, []);

  const shuffleCats = (id) => {
    console.log("Clicked Cat ID:", id); // Log the clicked cat ID
    setClickedId((prevIds) => {
      const updatedIds = [...prevIds, id];
      console.log("Updated Clicked Cat IDs:", updatedIds); // Log updated clicked IDs
      return updatedIds;
    });

    setCats((prevCats) => {
      const shuffledCats = [...prevCats].sort(() => Math.random() - 0.5);
      return shuffledCats;
    });
  };

  if (loading) {
    return <div>Loading cat images...</div>;
  }

  return (
    <div className="container">
      {cats.map((cat) => (
        <img
          key={cat.id}
          src={cat.url}
          alt="Cat"
          onClick={() => shuffleCats(cat.id)}
          style={{ cursor: "pointer", margin: "10px" }}
        />
      ))}

      <ul>
        {clickedId.map((id, index) => (
          <li key={index}>{id}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
