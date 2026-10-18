import { lazy, Suspense, type CSSProperties } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./shared/components/layout/navbar/Navbar";
import Footer from "./shared/components/layout/footer/Footer";
import { useTheme } from "./shared/context";
import useTyping from "./modules/typing/hooks/use-typing";

const Typing = lazy(() => import("./modules/typing/pages/Typing"));
const PrivacyPolicy = lazy(() => import("./modules/legal/pages/PrivacyPolicy"));
const Security = lazy(() => import("./modules/legal/pages/Security"));
const TermsOfService = lazy(
  () => import("./modules/legal/pages/TermsOfService"),
);

interface StyleElementProps {
  elementStyle?: CSSProperties;
}

// Layout with Navbar and Footer
const MainLayout = ({ elementStyle }: StyleElementProps) => {
  const { isTypingStarted } = useTyping();

  return (
    <div
      className="min-h-screen flex flex-col justify-between px-[10%] py-[2%] transition-colors duration-200"
      style={elementStyle}
    >
      <Navbar />
      <div key="content-holder" className="flex-1 flex flex-col">
        <Outlet />
      </div>
      <div
        className={`w-full transition-opacity duration-200 ${
          isTypingStarted ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Footer />
      </div>
    </div>
  );
};

// Layout without Navbar and Footer (for legal, auth, and future standalone pages)
const PlainLayout = ({ elementStyle }: StyleElementProps) => {
  return (
    <div
      className="min-h-screen px-[10%] py-[2%] transition-colors duration-200"
      style={elementStyle}
    >
      <Outlet />
    </div>
  );
};

const App = () => {
  const { background, primary } = useTheme();

  const elementStyle: CSSProperties = {
    backgroundColor: background,
    color: primary,
  };

  return (
    <Suspense fallback={null}>
      <Routes>
        {/* Pages WITH Navbar and Footer */}
        <Route element={<MainLayout elementStyle={elementStyle} />}>
          <Route path="/" element={<Typing />} />
          <Route path="*" element={<Typing />} />
        </Route>

        {/* Pages WITHOUT Navbar and Footer */}
        <Route element={<PlainLayout elementStyle={elementStyle} />}>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/security-policy" element={<Security />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
