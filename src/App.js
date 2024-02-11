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


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" redirectTo = "/home" />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute redirectTo="/login" />} >
        <Route path="/home" element={<Main />} />
      </Route>
    </>
  )
)


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setIsAuthenticated());
      } else {
        dispatch(logout());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
