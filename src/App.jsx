import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Watchlist from "./components/Watchlist";
import NavBar from "./components/NavBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">
        App Component
      </h1>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/watchlist" element={<Watchlist />}></Route>
      </Routes>
    </>
  );
}

export default App;
