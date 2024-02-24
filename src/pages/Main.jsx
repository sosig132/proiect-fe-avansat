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
import NavbarComponent from '../components/Navbar';
import { collection, getDocs } from "firebase/firestore";
import Recipe from '../components/Recipe';


const getRecipes = async () => {
    const recipesRef = collection(db, "recipes");
    const recipeSnap = await getDocs(recipesRef);

    return recipeSnap.docs.map(doc => doc.data());

}



const Main = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();


    const [recipes, setRecipes] = useState([]);
    
    const handleGetRecipes = async () => {
      const recipeData = await getRecipes();
      setRecipes(recipeData);
    }

    if(recipes.length===0){
        handleGetRecipes();
    }

    if (recipes.length>0){
        console.log(recipes)
    }

    return (
      <>
        <NavbarComponent />
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-center">Recipes</h1>
            <div className="flex flex-wrap justify-center">
                {recipes.map((recipe, index) => {
                    return (
                      <Recipe key={index} recipe={recipe} />
                    );
                })}
            </div>
        </div>

        
      </>
            
    )

}

export default Main;
