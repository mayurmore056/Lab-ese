import { useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("#3498db");
  const [palette, setPalette] = useState([]);

  // Convert HEX → RGB
  const hexToRgb = (hex) => {
    hex = hex.replace("#", "");
    const bigint = parseInt(hex, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  // Convert RGB → HEX
  const rgbToHex = (r, g, b) => {
    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
  };

  const generatePalette = () => {
    const { r, g, b } = hexToRgb(color);
    const shades = [];

    for (let i = 1; i <= 5; i++) {
      // Increase RGB towards white (255)
      const newR = Math.min(255, r + i * 30);
      const newG = Math.min(255, g + i * 30);
      const newB = Math.min(255, b + i * 30);

      shades.push(rgbToHex(newR, newG, newB));
    }

    setPalette(shades);
  };

  return (
    <div className="container">
      <h2>Color Palette Generator</h2>

      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="#3498db"
      />

      <button onClick={generatePalette}>Generate</button>

      <div className="palette">
        {palette.map((c, index) => (
          <div key={index} className="color-box">
            <div className="box" style={{ backgroundColor: c }}></div>
            <p>{c}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
