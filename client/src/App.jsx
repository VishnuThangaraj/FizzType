import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Loader from "@/components/Loader";

import "./App.scss";

// Lazy Loading pages
const TypingWorkspace = lazy(() => import("@/pages/TypingWorkspace"));

const App = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <div className="h-screen flex flex-col overflow-hidden px-3 md:px-18 lg:px-28 pt-8">
            <Navbar />

            <div id="main_content_holder" className="flex-1 overflow-y-auto">
              <Suspense fallback={<Loader />}>
                <TypingWorkspace />
              </Suspense>
            </div>

            <Footer />
          </div>
        }
      />
    </Routes>
  );
};

export default App;
