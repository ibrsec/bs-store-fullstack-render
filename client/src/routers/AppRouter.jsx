import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppBarComp from "../components/AppBarComp";
import LoginPage from "../pages/LoginPage";
import PrivateRouter from "./PrivateRouter";
import HomePage from "../pages/HomePage";
import PublicRouter from "./PublicRouter";
import RegisterPage from "../pages/RegisterPage";
import AdminPanel from "../pages/AdminPanel";
import ProductDetailPage from "../pages/ProductDetailPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppBarComp />
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/" element={<PrivateRouter />}>
          <Route path="" element={<HomePage />} />
          <Route path="detail/:id" element={<ProductDetailPage />} />
          <Route path="admin" element={<AdminPanel />} />

        </Route>

        <Route path="/login" element={<PublicRouter />}>
          <Route path="" element={<LoginPage />} />
        </Route>
        <Route path="/register" element={<PublicRouter />}>
          <Route path="" element={<RegisterPage />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
