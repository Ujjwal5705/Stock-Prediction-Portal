import { useState } from "react";
import "./assets/css/style.css";
import Main from "./assets/components/main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./assets/components/Register";
import Header from "./assets/components/header";
import Footer from "./assets/components/footer";
import Login from "./assets/components/Login";
import AuthProvider from "./AuthProvider";
import Dashboard from "./assets/components/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
            <Routes>
              <Route path="/" element={<PublicRoute><Main /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}/>
              <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
            </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
