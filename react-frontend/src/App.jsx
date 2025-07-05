import { useState } from "react";
import "./assets/css/style.css";
import Main from "./assets/components/main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./assets/components/Register";
import Header from "./assets/components/header";
import Footer from "./assets/components/footer";
import Login from "./assets/components/Login";
import AuthProvider from "./AuthProvider";
import Dashboard from "./assets/components/dashboard/Dashboard";


function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
