import React, { useEffect, Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

const CoinPage = React.lazy(() => import("./routes/coinPage/CoinPage.jsx"));
const MainPage = React.lazy(() => import("./routes/mainPage/MainPage.jsx"));
import Error from "./components/Error.jsx";
import Footer from "./components/Footer.jsx";
import Loading from "./components/Loading.jsx";

function AppLayout() {
  return (
    <div className="app">
      <Routes>
        <Route path="/CoinPage/:id" element={<CoinPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    console.log(
      "%cDesigned and Coded by Laura Głąb",
      "color: white; padding: 5px 7px; border-radius: 5px; font-weight: bold; background-color: #df8653;"
    );
  }, []);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <AppLayout />
      </Suspense>
    </Router>
  );
}