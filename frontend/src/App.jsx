import React from "react";
import "./index.css";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import News from "./Pages/News";
import Contact from "./Pages/Contact";

import Basic from "./Pages/Basic";
import Detailed from "./Pages/Detailed";
import Procurement from "./Pages/Procurement";
import Project from "./Pages/Project";
import Site from "./Pages/Site";

import Privacy from "./Pages/Privacy";
import Terms from "./Pages/Terms";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feasibility from "./Pages/Feasibility";
import TechnologyDetail from "./Technologies/TechnologyDetail";
import ProductDetail from "./Products/ProductDetail";
import Career from "./Pages/Career";
import BasicEngineering from "./Pages/BasicEngineering";
import ServicesSection from "./Pages/Services";
import NewsDetail from "./Component/NewsComponents/NewsDetail";
import Bioremediation from "./Pages/Bioremediation";
import DynamicServiceDetail from "./Pages/DynamicServiceDetail";

// Admin Components
import AdminLayout from "./admin/Layout/AdminLayout";
import AdminHome from "./admin/Pages/AdminHome";
import AdminAbout from "./admin/Pages/AdminAbout";
import AdminServices from "./admin/Pages/AdminServices";
import AdminTechnologies from "./admin/Pages/AdminTechnologies";
import AdminProducts from "./admin/Pages/AdminProducts";
import AdminNews from "./admin/Pages/AdminNews";
import AdminCareer from "./admin/Pages/AdminCareer";
import AdminContact from "./admin/Pages/AdminContact";
import AdminSettings from "./admin/Pages/AdminSettings";
import AdminHomeHero from "./admin/Pages/AdminHomeHero";
import AdminHomeAbout from "./admin/Pages/AdminHomeAbout";
import AdminStrategicAdvice from "./admin/Pages/AdminStrategicAdvice";
import AdminWhatSetsUsApart from "./admin/Pages/AdminWhatSetsUsApart";
import AdminLogin from "./admin/Pages/AdminLogin";
import AdminWorkInAction from "./admin/Pages/AdminWorkInAction";
import AdminBioremediation from "./admin/Pages/AdminBioremediation";
import AdminRegister from "./admin/Pages/AdminRegister";
import ProtectedRoute from "./admin/Layout/ProtectedRoute";

import { Toaster } from "react-hot-toast";
import NotFound from "./Pages/NotFound";

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<ServicesSection />} />
            <Route path="/services/BasicEngineering" element={<BasicEngineering />} />
            <Route path="/services/feasibility" element={<Feasibility />} />
            <Route path="/services/basic" element={<Basic />} />
            <Route path="/services/detailed" element={<Detailed />} />
            <Route path="/services/procurement" element={<Procurement />} />
            <Route path="/services/project" element={<Project />} />
            <Route path="/services/site" element={<Site />} />
            <Route path="/services/:slug" element={<DynamicServiceDetail />} />
            <Route path="/technology/bioremediation" element={<Bioremediation />} />


            {/* Technology Routes */}
            <Route path="/technology/:slug" element={<TechnologyDetail />} />

            {/* Product Routes */}
            <Route path="/product/:path" element={<ProductDetail />} />
            <Route path="career" element={<Career />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminHome />} />
              <Route path="/admin/about" element={<AdminAbout />} />
              <Route path="/admin/what-sets-us-apart" element={<AdminWhatSetsUsApart />} />
              <Route path="/admin/services" element={<AdminServices />} />
              <Route path="/admin/technologies" element={<AdminTechnologies />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/news" element={<AdminNews />} />
              <Route path="/admin/career" element={<AdminCareer />} />
              <Route path="/admin/contact" element={<AdminContact />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/home-hero" element={<AdminHomeHero />} />
              <Route path="/admin/home-about" element={<AdminHomeAbout />} />
              <Route path="/admin/strategic-advice" element={<AdminStrategicAdvice />} />
              <Route path="/admin/work-in-action" element={<AdminWorkInAction />} />
              <Route path="/admin/bioremediation" element={<AdminBioremediation />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
