import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';

function App() {
  // const user= (data: any) =>{
  //   console.log(data)
  // }

  return (
    <Routes>
      <Route path="/" element={<Form/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
  );
}

export default App;
