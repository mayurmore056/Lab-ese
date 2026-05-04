function WeatherCard({ city, temperature, condition, humidity }) {
  // Dynamic class based on condition
  const getClass = () => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return "card sunny";
      case "rainy":
        return "card rainy";
      case "cloudy":
        return "card cloudy";
      case "snowy":
        return "card snowy";
      default:
        return "card";
    }
  };

  return (
    <div className={getClass()}>
      <h3>{city}</h3>
      <p>{temperature}°C</p>
      <p>Condition: {condition}</p>
      <p>Humidity: {humidity}%</p>
    </div>
  );
}

export default WeatherCard;
