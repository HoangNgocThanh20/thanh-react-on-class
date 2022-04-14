import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import { ProductAdd } from "./components/ProductAdd";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/product/add" element={<ProductAdd />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function NotFound() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <p>Oppps !!</p>
        <h2>This Page does not exist</h2>
      </div>
    </div>
  );
}

export default App;
