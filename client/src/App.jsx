import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "@/shared/components/Navbar/Navbar";
import Footer from "@/shared/components/Footer/Footer";
import Loader from "@/shared/components/Loader";

import "./App.scss";

// Lazy Loading pages
const AuthPage = lazy(() => import("@/features/auth/pages/AuthPage"));

const App = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <div className="min-h-screen flex flex-col px-3 md:px-18 lg:px-28 pt-8">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center">
              <div className="w-full">
                <Suspense fallback={<Loader />}>
                  <AuthPage />
                </Suspense>
              </div>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        }
      />
    </Routes>
  );
};

export default App;
