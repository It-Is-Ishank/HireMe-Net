import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";


const App = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <footer>footer</footer>
    </>
)};

export default App;
