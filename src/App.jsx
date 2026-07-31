import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Header from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/customer/Register";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/reg" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;