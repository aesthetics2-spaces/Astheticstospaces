import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/main/Navbar";
import Footer from "./components/main/Footer";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Gallery from "./pages/Gallery";
import DesignDetails from "./pages/DesignDetails";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";
import AIConsultant from "./pages/AIConsultant";
import Feedback from "./pages/Feedback";
import Waitlist from "./pages/Waitlist";
import Onboarding from "./pages/Onboarding";
import NotFound404 from "./pages/NotFound404";
import ForgotPasswordPage from "./pages/ForgotPassword";
import AuthCallback from "./pages/AuthCallback";
import ScrollToTop from "./components/main/ScrollToTop";

function App() {
  return (
    <Routes>
      {/* Routes with Navbar and Footer */}
      <Route
        path="/*"
        element={
          <>
                <ScrollToTop/>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/design/:id" element={<DesignDetails />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/ai-consultant" element={<AIConsultant />} />
              <Route path="/how-it-works" element={<Home />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/waitlist" element={<Waitlist />} />
              <Route path="*" element={<NotFound404 />} />
            </Routes>
            <Footer />
          </>
        }
      />

      {/* Routes without Navbar and Footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/onboarding" element={<Onboarding />} />
    </Routes>
  );
}

export default App;
