import { useReducer } from "react";
import "./App.css";

// 🛒 Initial products
const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 20000 },
  { id: 3, name: "Headphones", price: 2000 },
  { id: 4, name: "Keyboard", price: 1500 },
  { id: 5, name: "Mouse", price: 800 },
];

// 🧠 Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const existing = state.find((item) => item.id === action.payload.id);

      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      return [...state, { ...action.payload, qty: 1 }];

    case "INCREMENT":
      return state.map((item) =>
        item.id === action.payload ? { ...item, qty: item.qty + 1 } : item,
      );

    case "DECREMENT":
      return state
        .map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty - 1 } : item,
        )
        .filter((item) => item.qty > 0);

    case "REMOVE":
      return state.filter((item) => item.id !== action.payload);

    default:
      return state;
  }
}

function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="container">
      <h2>Shopping Cart</h2>

      {/* Products */}
      <h3>Products</h3>
      <div className="products">
        {products.map((p) => (
          <div key={p.id} className="card">
            <p>{p.name}</p>
            <p>₹{p.price}</p>
            <button onClick={() => dispatch({ type: "ADD", payload: p })}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart */}
      <h3>Cart</h3>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <span>
              {item.name} (₹{item.price}) x {item.qty}
            </span>

            <div>
              <button
                onClick={() =>
                  dispatch({ type: "INCREMENT", payload: item.id })
                }
              >
                +
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "DECREMENT", payload: item.id })
                }
              >
                -
              </button>
              <button
                onClick={() => dispatch({ type: "REMOVE", payload: item.id })}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      <h3>Total: ₹{total}</h3>
    </div>
  );
}

export default App;
