import { ThemeProvider } from "./ThemeContext";
import Navbar from "./Navbar";
import Card from "./Card";
import Footer from "./Footer";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Card />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
