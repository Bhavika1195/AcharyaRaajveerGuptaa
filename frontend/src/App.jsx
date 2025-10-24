import "./App.css";
import AllRoute from "./Routes/AllRoute";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div>
          <AllRoute />
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
