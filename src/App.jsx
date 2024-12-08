import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  const [clickedId, setClickedId] = useState([]);

  const updatedScore = clickedId.length;

  console.log("RENDERING");

  if (clickedId.length > 1) {
    console.log("cats array filled");

    const latestCatId = clickedId.length - 1;
    console.log(latestCatId, clickedId.length);

    for (let i = 0; i < clickedId.length - 1; i++) {
      if (clickedId[i] === clickedId[latestCatId]) {
        setClickedId([]);
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

      <ul>{updatedScore}</ul>
    </div>
  );
}

export default App;

// THIS SECTION SHOWS A BETTER SOLUTION I CAN LOOK UP TO THAT  simplifies logic, improves readability, and adheres to React best practices:

// function App() {
//   const [cats, setCats] = useState([]);
//   const [clickedIds, setClickedIds] = useState(new Set());
//   const [score, setScore] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCats = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.thecatapi.com/v1/images/search?limit=10"
//         );
//         setCats(response.data);
//       } catch (error) {
//         console.error("Error fetching cat images:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCats();
//   }, []);

//   const handleCatClick = (id) => {
//     if (clickedIds.has(id)) {
//       // Reset score and clickedIds if clicked again
//       setScore(0);
//       setClickedIds(new Set());
//     } else {
//       // Increment score and add ID to clickedIds
//       setScore((prevScore) => prevScore + 1);
//       setClickedIds((prevIds) => new Set(prevIds).add(id));
//     }
//     // Shuffle cats
//     setCats((prevCats) => [...prevCats].sort(() => Math.random() - 0.5));
//   };

//   if (loading) {
//     return <div>Loading cat images...</div>;
//   }

//   return (
//     <div className="container">
//       <h1>Cat Memory Game</h1>
//       <p>Score: {score}</p>
//       <div className="cat-gallery">
//         {cats.map((cat) => (
//           <img
//             key={cat.id}
//             src={cat.url}
//             alt="Cat"
//             onClick={() => handleCatClick(cat.id)}
//             style={{ cursor: "pointer", margin: "10px", width: "150px" }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
