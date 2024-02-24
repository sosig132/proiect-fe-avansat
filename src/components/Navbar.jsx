
import React from "react";
import {auth} from "../firebase/firebase";
import {signOut} from "firebase/auth";
import { useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Tooltip, Link } from '@nextui-org/react';
import { logout } from "../store/authReducer";
import { useDispatch } from "react-redux";


const NavbarComponent = () => {
  const [activeItem, setActiveItem] = useState('Home');

  const handleItemClick = (name) => {
    setActiveItem(name);
  };

  const dispatch = useDispatch();

  return (
    
        <Navbar className="px-28  mx-auto bg-black opacity-80" style={{maxWidth: "100%", minHeight: "7vh" }}>
            <NavbarBrand href="#" style={{ color: '#333', fontWeight: 'bold' }}>Proiect</NavbarBrand>
            <NavbarContent className = "gap-12" justify="center">
                <NavbarItem>
                <Link
                    href="/home" 
                    className = "onHover:underline"

                
                >
                    Home
                </Link>
                    
                
                </NavbarItem>
                <NavbarItem>
                    <Link
                        href="/post-recipe">
                        Post Recipe
                    </Link> 
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <Tooltip text="Logout" placement="bottom">
                <Button auto  light onClick={() => {dispatch(logout());

                }}>
                    Logout
                </Button>
                </Tooltip>
            </NavbarContent>
        </Navbar>

  );
};

export default NavbarComponent;
