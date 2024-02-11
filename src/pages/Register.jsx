import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import {Button} from "@nextui-org/button";

const RegisterPage = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Add code here to save the displayName and username to your database
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/home" />;
    }

    return (
        <Button> Press Me </Button>
    );
}

export default RegisterPage;
