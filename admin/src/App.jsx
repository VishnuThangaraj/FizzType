import { Routes, Route } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./App.scss";

const App = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <div className="h-screen flex flex-col overflow-hidden px-3 md:px-10 lg:px-15">
            <Navbar />

            <div id="main_content_holder" className="flex-1 overflow-y-auto">
              {/* long content */}
            </div>

            <Footer />
          </div>
        }
      />
    </Routes>
  );
};

export default App;
