import logo from './logo.svg';
import './App.css';

import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import ProtectedRoute from './components/ProtectedRoute';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setIsAuthenticated } from "./store/authReducer";
import NavbarComponent from './components/Navbar';
import PostRecipe from './pages/PostRecipe';
import { useState } from 'react';



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" redirectTo = "/home" />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute redirectTo="/login" />} >
          <Route path="/home" element={<Main />} />
          <Route path="/post-recipe" element={<PostRecipe />} />
      </Route>
    </>
  )
)


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();



  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setIsAuthenticated());
      } else {
        dispatch(logout());
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  if (!loading) {
    return <RouterProvider router={router} />;
  }
  else {
    return <div>Loading...</div>
  }
}

export default App;
