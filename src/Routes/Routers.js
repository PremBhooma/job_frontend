import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/DashboardPages/Dashboard";
import ScrollToTop from "../Pages/ScrollToTop";
import Login from "../Pages/DashboardPages/Login";
import Category from "../Pages/DashboardPages/Category";
import ContactEnquire from "../Pages/DashboardPages/ContactEnquire";
import AddProduct from "../Pages/DashboardPages/AddProduct";
import EditProduct from "../Pages/DashboardPages/EditProduct";
import AllAiTools from "../Pages/DashboardPages/AllAiTools";
import NewsLetter from "../Pages/DashboardPages/NewsLetter";

const Routers = () => {
  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
          <Route path="/allaitools" element={<AllAiTools />} />
          <Route path="/category" element={<Category />} />
          <Route path="/contact-enquire" element={<ContactEnquire />} />
          <Route path="/newsletter" element={<NewsLetter />} />
        </Routes>
      </ScrollToTop>
    </>
  );
};

export default Routers;
