import React, { useState, useEffect } from 'react';
import './App.css';
import Users from './User';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Userdata from './Userdata';

const App = () => {

  const[data, setData] = useState([]);

  useEffect(()=>{
    fetch("https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json").then((result)=>{
      result.json().then((resp)=>{
        setData(resp);
      });
    });
  },[]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Users data={data} />} />
          <Route path="/User/:id" element={<Userdata data={data} />} />
        </Routes>
      </Router>
    </>
  );
}


export default App;
