import { useState, useEffect } from "react";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import FeaturesPage from "./pages/FeaturesPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

// ── initial scores ────────────────────────────────────────────────
const INITIAL_SCORES = [
  { id: 1, player: "Alice",  score: 12400, time: "4:32", date: "2025-04-10" },
  { id: 2, player: "Bob",    score: 11850, time: "5:10", date: "2025-04-09" },
  { id: 3, player: "Carol",  score: 10300, time: "6:05", date: "2025-04-08" },
  { id: 4, player: "David",  score:  9750, time: "7:20", date: "2025-04-07" },
  { id: 5, player: "Eva",    score:  8900, time: "8:45", date: "2025-04-06" },
];

export default function App() {
  const [page, setPage] = useState("Home");
  const [scores, setScores] = useState(INITIAL_SCORES);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <>
      <Nav page={page} setPage={setPage} />
      {page === "Home" && <HomePage setPage={setPage} scores={scores} setScores={setScores} />}
      {page === "About" && <AboutPage />}
      {page === "Features" && <FeaturesPage />}
      {page === "Contact" && <ContactPage />}
      <Footer setPage={setPage} />
    </>
  );
}
