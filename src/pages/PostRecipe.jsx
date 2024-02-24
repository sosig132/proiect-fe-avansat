import NavbarComponent from "../components/Navbar";
import { Textarea, Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { db, auth } from "../firebase/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { collection, getDoc, doc, setDoc } from "firebase/firestore";

const PostRecipe = () => {
    const [recipeName, setRecipeName] = useState("");
    const [recipeDescription, setRecipeDescription] = useState("");
    const [file, setFile] = useState([]);
    
    const [error, setError] = useState("");
    
    const handlePostRecipe = async () => {
        if (recipeName === "" || recipeDescription === "" || file === null) {
            setError("Please fill in all fields");
            return;
        }
    
        try {
            const userRef = doc(db, "users", auth.currentUser.uid);
            const userSnap = await getDoc(userRef);
    
            if (!userSnap.exists()) {
                setError("User does not exist");
                return;
            }
    
            const user = userSnap.data();
            const { Name } = user;
    
            const recipeRef = doc(collection(db, "recipes"));
            const storageRef = ref(storage, `recipeImages/${recipeRef.id}`);
    
            const metadata = {
                contentType: 'image/jpeg'
            };
    
            const reader = new FileReader();
            reader.onloadend = async () => {
                const blob = new Blob([reader.result], { type: file.type });
                const uploadTaskSnapshot = await uploadBytes(storageRef, blob, metadata);
                const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
    
                const recipe = {
                    author: Name,
                    title: recipeName,
                    body: recipeDescription,
                    image: downloadURL
                };
    
                await setDoc(recipeRef, recipe);
                console.log('Uploaded a blob or file!');
            };
            reader.readAsArrayBuffer(file);
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
    }
    
    
    return (
        <div className = "flex flex-col justify-center items-center [&>*]:mb-3">
            <NavbarComponent />
            <h1 className="text-3xl">Post Recipe</h1>
            <div className="[&>*]:mb-3" style = {{width:"100%",maxWidth: "1000px"}}>
                <Input
                    isRequired
                    label = "Recipe Name"
                    value={recipeName}
                    onChange={(e) => {setRecipeName(e.target.value)
                                    setError("")
                    }}
                />
                <Textarea
                    isRequired
                    label = "Recipe Description"
                    value={recipeDescription}
                    onChange={(e) => {setRecipeDescription(e.target.value)
                                    setError("")
                    }}
                
                />

                <input type="file" id="file" name="file" onChange={(e) => {setFile(e.target.files[0])
                                    setError("")
                      
            }} />

                {error && <p color="red">{error}</p>}
                <div className = "w-100 grid grid-cols-3">
                    <Button className="col-start-2" onClick={handlePostRecipe}>Post Recipe</Button>
                </div>
            </div>

            
        </div>
    )
}

export default PostRecipe;