import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";

import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>

          {/* Route yang ADA navbar */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Route TANPA navbar */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
