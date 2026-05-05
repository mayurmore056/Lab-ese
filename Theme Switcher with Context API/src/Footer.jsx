import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={`footer ${theme}`}>
      <p>Footer Section</p>
    </footer>
  );
}

export default Footer;
