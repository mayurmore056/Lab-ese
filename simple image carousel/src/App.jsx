import { useState } from "react";
import "./App.css";

function App() {
  const images = [
    "https://picsum.photos/id/1015/600/300",
    "https://picsum.photos/id/1016/600/300",
    "https://picsum.photos/id/1018/600/300",
    "https://picsum.photos/id/1020/600/300",
  ];

  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((index + 1) % images.length);
  };

  const prev = () => {
    setIndex((index - 1 + images.length) % images.length);
  };

  return (
    <div className="container">
      <h2>Image Carousel</h2>

      <div className="carousel">
        <img src={images[index]} alt="slide" />

        <div className="controls">
          <button onClick={prev}>Previous</button>
          <button onClick={next}>Next</button>
        </div>

        <p>
          {index + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}

export default App;
