import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "@/shared/components/Navbar/Navbar";
import Footer from "@/shared/components/Footer/Footer";
import Loader from "@/shared/components/Loader";

import "./App.scss";

// Lazy Loading pages
const AuthPage = lazy(() => import("@/features/auth/pages/AuthPage"));
const TermsOfService = lazy(
  () => import("@/features/legal/pages/TermsOfService"),
);
const TypingWorkspace = lazy(
  () => import("@/features/typing/pages/TypingWorkspace"),
);

const App = () => {
  return (
    <Routes>
      {/* Terms of Service — no Navbar or Footer */}
      <Route
        path="/terms-of-service"
        element={
          <div className="min-h-screen flex flex-col px-3 md:px-6 lg:px-10 pt-8">
            <Suspense fallback={<Loader />}>
              <TermsOfService />
            </Suspense>
          </div>
        }
      />

      {/* Main layout — all other routes */}
      <Route
        path="/*"
        element={
          <div className="min-h-screen flex flex-col px-3 md:px-18 lg:px-28 pt-8">
            <Navbar />

            <main className="flex-1 flex flex-col w-full">
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/" element={<TypingWorkspace />} />
                  <Route path="/login" element={<AuthPage />} />
                </Routes>
              </Suspense>
            </main>

            <Footer />
          </div>
        }
      />
    </Routes>
  );
};

export default App;
