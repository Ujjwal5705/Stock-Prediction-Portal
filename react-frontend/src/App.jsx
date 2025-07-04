import { useState } from "react";
import "./assets/css/style.css";
import Main from "./assets/components/main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./assets/components/Register";
import Header from "./assets/components/header";
import Footer from "./assets/components/footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="register/" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
