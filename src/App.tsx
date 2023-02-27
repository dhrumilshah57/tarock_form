import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import PageNotFound from './PageNotFound';

function App() {
  const initialToken = localStorage.getItem('auth');

  return (
    <Routes>
      <Route path="/" element={<Form />} />
      {/* <Route path='/home' element={<Home />} /> */}
      {
        initialToken === "1" ?
          <Route path='/home' element={<Home />} /> : <Route path="/" element={<Form />} />
      }

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
