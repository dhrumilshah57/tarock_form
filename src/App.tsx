import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Home from './Home';
import PageNotFound from './PageNotFound';
import Users from './Users';
import UsersData from './UsersData';
import MasterPage from './MasterPage';
import { User } from './models/user';

function App() {
  console.log(localStorage.getItem('auth'));
  const auth = localStorage.getItem('auth');
  const initialToken = auth ? JSON.parse(localStorage.getItem('auth') ?? "") as User : undefined;


  return (
    <Routes>
      <Route path="/" element={<Form />} />
      {/* <Route path='/home' element={<Home />} /> */}
      {initialToken?.status === "1" && (
        <Route path='/home' element={<Outlet />}>
          <Route path='/home' element={<MasterPage />} >
            <Route
              index
              element={<Navigate to="/home/dashboard" replace />}
            />
            <Route path='/home/dashboard' element={<Outlet />}>
              <Route path='/home/dashboard' element={<Home />} />
            </Route>
            <Route path='/home/users' element={<UsersData />} />
          </Route>

        </Route>

      )}

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
