import { BrowserRouter, Routes, Route } from "react-router-dom";

import AboutUs from "./pages/AboutUs";
import Coaching from "./pages/Coaching";
import NewsEvents from "./pages/NewsEvents";
import Contact from "./pages/Contact";
import Trust from "./pages/Trust";
import School from "./pages/School";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PortalSection from "./components/PortalSection";
import Initiatives from "./components/Initiatives";
import WhyChoose from "./components/WhyChoose";
import CoachingPrograms from "./components/CoachingPrograms";
import Achievements from "./components/Achievements";
import Faculty from "./components/Faculty";
import LifeAtAmbition from "./components/LifeAtAmbition";
import EventsNews from "./components/EventsNews";
import Footer from "./components/Footer";

/* Admin */
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Offers from "./pages/admin/Offers";
import HeroManagement from "./pages/admin/HeroManagement";
import InitiativesManagement from "./pages/admin/InitiativesManagement";
import AchievementsManagement from "./pages/admin/AchievementsManagement";
import FacultyManagement from "./pages/admin/FacultyManagement";
import EventsManagement from "./pages/admin/EventsManagement";
import NewsManagement from "./pages/admin/NewsManagement";
import GalleryManagement from "./pages/admin/GalleryManagement";
import BrochureManagement from "./pages/admin/BrochureManagement";
import SettingsManagement from "./pages/admin/SettingsManagement";

/*gallery*/
import Gallery from "./pages/Gallery";

const Home = () => {
  return (
    <>
      <TopBar />
      <Navbar />
      <Hero />
      <PortalSection />
      <Initiatives />
      <WhyChoose />
      <CoachingPrograms />
      <Achievements />
      <Faculty />
      <LifeAtAmbition />
      <EventsNews />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC WEBSITE ================= */}
        <Route path="/" element={<Home />} />

        {/* ================= ADMIN LOGIN ================= */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* ================= PROTECTED ADMIN ================= */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            {/* Dashboard */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            {/* Offers */}
            <Route path="/admin/offers" element={<Offers />} />

            {/* Hero */}
            <Route path="/admin/hero" element={<HeroManagement />} />

            {/* Initiatives */}
            <Route
              path="/admin/initiatives"
              element={<InitiativesManagement />}
            />

            {/* Achievements */}
            <Route
              path="/admin/achievements"
              element={<AchievementsManagement />}
            />

            {/* Faculty */}
            <Route path="/admin/faculty" element={<FacultyManagement />} />

            {/* Events */}
            <Route path="/admin/events" element={<EventsManagement />} />

            {/* News */}
            <Route path="/admin/news" element={<NewsManagement />} />

            {/* Gallery */}
            <Route path="/admin/gallery" element={<GalleryManagement />} />

            {/* Brochure */}
            <Route path="/admin/brochure" element={<BrochureManagement />} />

            {/* Settings */}
            <Route path="/admin/settings" element={<SettingsManagement />} />
          </Route>
        </Route>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/school" element={<School />} />
        <Route path="/coaching" element={<Coaching />} />
        <Route path="/trust" element={<Trust />} />
        <Route path="/news-events" element={<NewsEvents />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
