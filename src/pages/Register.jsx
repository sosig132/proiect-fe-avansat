import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/react";
import {Link} from "@nextui-org/react";
import { setDoc, doc } from 'firebase/firestore';
import {db} from '../firebase/firebase';

const RegisterPage = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
            const {uid} = userCredential.user
            try{

                const hey = await setDoc(doc(db, "users", uid), {
                    Name: displayName,
                    email: email,
                    user_id: uid,
                })
                console.log(hey)
                console.log(userCredential)
            }
            catch (error) {
                console.error(error.message);
                setError(error.message);
            }
            navigate("/login");
          } catch (error) {
            console.error(error.message);
            setError(error.message);
          }
    };

    if (isAuthenticated) {
        return <Navigate to="/home" />;
    }

    return (
        <div
            className = "bg-cover h-screen flex items-center justify-center"
            style = {{
                backgroundImage: "url(https://images.creativemarket.com/0.1.0/ps/6817836/1820/1213/m1/fpnw/wm1/ppjyzfwgu3bslgx649uvkwoixqqyaecyqhdumlgebllo3eacpfu8n08enom0fnhj-.jpg?1565781144&s=37b74a19c3153bef88295533b08f6155)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "100vh"             
        }}>
            <div className = "flex flex-col  p-8 bg-white rounded-lg shadow-md [&>*]:pb-5 [&>*]:w-5/6 [&>*]:mx-auto "
            
                style = {{minWidth:"600px"}}
            >
                <h1 className = "text-3xl font-bold text-center">Register</h1>
                <Input
                    isRequired
                    label = "Display Name"
                    value={displayName}
                    onChange={(e) => {setDisplayName(e.target.value)
                                    setError("")
                    }}
                    
                />
                <Input
                    isRequired
                    label = "Username"
                    value={username}
                    onChange={(e) => {setUsername(e.target.value)
                    
                                    setError("")
                    }}
                />
                <Input
                    isRequired
                    label = "Email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)
                                    setError("")
                    }}
                
                
                />
                <Input
                    isRequired
                    type="password"
                    label = "Password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)
                                    setError("")
                    }}
                />
                <Input 
                    isRequired
                    label = "Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {setConfirmPassword(e.target.value)
                                    setError("")
                    }}
                />
                {error && <p color="red">{error}</p>}
                <div className = "w-100 grid grid-cols-3">
                    <Button className="col-start-2" onClick={handleRegister}>Register</Button>
                </div>
                <div className = "w-100 grid">
                    <Link id="change-to-login" size="sm" className = "col-start-2" underline="always" href="/login">I already have an account</Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
