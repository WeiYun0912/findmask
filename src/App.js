import React, { useState, useEffect } from "react";
import "./App.css";
import Masks from "./components/Masks";
import Navbar from "./components/Navbar";
function App() {
  const [mask, setMask] = useState([]);
  useEffect(() => {
    getMaskData();
  }, []);

  const getMaskData = async () => {
    const response = await fetch(
      `https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json`
    );
    const data = await response.json();
    // console.log(data.features);
    setMask(data.features);
  };
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Masks mask={mask} />
      </div>
    </div>
  );
}

export default App;
