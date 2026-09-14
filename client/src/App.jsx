import React from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <About />
        <Portfolio />
        <Contact />
      </main>
    </>
  );
}
