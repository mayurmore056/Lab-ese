import { useState } from "react";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation
  const validateStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email) {
        setError("All fields required");
        return false;
      }
    }
    if (step === 2) {
      if (!formData.username || !formData.password) {
        setError("All fields required");
        return false;
      }
    }
    setError("");
    return true;
  };

  const next = () => {
    if (validateStep()) setStep(step + 1);
  };

  const back = () => {
    setStep(step - 1);
  };

  const submit = () => {
    alert("Form Submitted!");
    console.log(formData);
  };

  return (
    <div className="container">
      <h2>Multi-Step Registration</h2>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="card">
          <h3>Personal Info</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <button onClick={next}>Next</button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="card">
          <h3>Account Info</h3>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="buttons">
            <button onClick={back}>Back</button>
            <button onClick={next}>Next</button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="card">
          <h3>Review</h3>
          <p>
            <b>Name:</b> {formData.name}
          </p>
          <p>
            <b>Email:</b> {formData.email}
          </p>
          <p>
            <b>Username:</b> {formData.username}
          </p>
          <p>
            <b>Password:</b> {formData.password}
          </p>

          <div className="buttons">
            <button onClick={back}>Back</button>
            <button onClick={submit}>Submit</button>
          </div>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
