import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Card() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`card ${theme}`}>
      <h3>Card Component</h3>
      <p>This card changes with theme.</p>
    </div>
  );
}

export default Card;
