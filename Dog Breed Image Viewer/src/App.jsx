import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all breeds
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((data) => {
        setBreeds(Object.keys(data.message));
      });
  }, []);

  // Fetch image for selected breed
  const fetchImage = (breed) => {
    setSelectedBreed(breed);
    setLoading(true);

    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then((res) => res.json())
      .then((data) => {
        setImage(data.message);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h2>Dog Breed Viewer 🐶</h2>

      <div className="layout">
        {/* Breed List */}
        <div className="list">
          {breeds.map((breed) => (
            <p
              key={breed}
              onClick={() => fetchImage(breed)}
              className={breed === selectedBreed ? "active" : ""}
            >
              {breed}
            </p>
          ))}
        </div>

        {/* Image Display */}
        <div className="viewer">
          {loading && <p>Loading...</p>}

          {!loading && image && (
            <>
              <h3>{selectedBreed}</h3>
              <img src={image} alt="dog" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
