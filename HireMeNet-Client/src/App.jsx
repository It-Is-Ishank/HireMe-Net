import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";


const App = () => {
  // @todo remove dependency on hardcoded API sockets throughout the document if deployed on a dedicated server.
  return (
    <>
      <Navbar/>
      <Outlet/>
      <footer>footer</footer>
    </>
)};

export default App;
