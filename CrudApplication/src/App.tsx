import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar'
import Users from './Users'
import UserCreate from './UserCreate'
import { render } from "@testing-library/react";
import Customers from "./Customers";
import CustomerCreate from "./CustomerCreate";
import CustomerUpdate from "./CustomerUpdate";

function App() {
  return (
    <>
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/create' element={<UserCreate />} />
          <Route path='/userupdate/Id' element={<CustomerUpdate />} />
          <Route path='/customer' element={<Customers />} />
          <Route path='/customercreate' element={<CustomerCreate />} />
          <Route path='/customerupdate/:id' element={<CustomerUpdate />} />
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
