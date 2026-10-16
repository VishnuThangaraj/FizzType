import { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./shared/components/layout/navbar/Navbar";
import Footer from "./shared/components/layout/footer/Footer";

const Typing = lazy(() => import("./modules/typing/pages/Typing"));
const PrivacyPolicy = lazy(() => import("./modules/legal/pages/PrivacyPolicy"));
const Security = lazy(() => import("./modules/legal/pages/Security"));
const TermsOfService = lazy(
  () => import("./modules/legal/pages/TermsOfService"),
);

// Layout with Navbar and Footer
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between px-[10%] py-[2%]">
      <Navbar />
      <div key="content-holder" className="flex-1 flex flex-col justify-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

// Layout without Navbar and Footer (for legal, auth, and future standalone pages)
const PlainLayout = () => {
  return (
    <div className="min-h-screen px-[10%] py-[2%]">
      <Outlet />
    </div>
  );
};

const App = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        {/* Pages WITH Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Typing />} />
          <Route path="*" element={<Typing />} />
        </Route>

        {/* Pages WITHOUT Navbar and Footer */}
        <Route element={<PlainLayout />}>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/security-policy" element={<Security />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
