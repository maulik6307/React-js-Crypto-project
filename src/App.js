import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Component/Header";
import Home from "./Component/Home";
import Coins from "./Component/Coins";
import CoinDetails from "./Component/CoinDetails";
import Exchanges from "./Component/Exchanges";
import Footer from "./Component/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins" element={<Coins />} />
          <Route path="/coins/:id" element={<CoinDetails />} />
          <Route path="/exchanges" element={<Exchanges />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
