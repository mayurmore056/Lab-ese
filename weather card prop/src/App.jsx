import WeatherCard from "./WeatherCard";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h2>Weather Cards</h2>

      <WeatherCard
        city="Mumbai"
        temperature={32}
        condition="sunny"
        humidity={60}
      />

      <WeatherCard
        city="Pune"
        temperature={25}
        condition="rainy"
        humidity={80}
      />

      <WeatherCard
        city="Delhi"
        temperature={28}
        condition="cloudy"
        humidity={55}
      />

      <WeatherCard
        city="Shimla"
        temperature={12}
        condition="snowy"
        humidity={70}
      />
    </div>
  );
}

export default App;
