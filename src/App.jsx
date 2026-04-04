import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Producten from "./pages/Producten";
import Admin from "./pages/Admin";

export default function App() {
    return (
        <BrowserRouter>
            <div className="font-sans text-[#1e293b] bg-white overflow-x-clip">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/producten" element={<Producten />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
