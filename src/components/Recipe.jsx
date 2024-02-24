import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Recipe = ({ recipe }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = (event) => {
        event.stopPropagation();
        setModalIsOpen(false);
        
          
    };

    return (
        <div onClick={openModal} className="flex flex-col items-center justify-center m-5 hover:shadow-md cursor-pointer">
            <h1 className="text-2xl font-bold">{recipe.title}</h1>
            <p className="text-center">{recipe.author}</p>
            <img src={recipe.image} alt="recipe" className="w-96 h-96" />

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Recipe Modal"
                style={{
                    content: {
                        display: 'flex',
                        flexDirection: 'row'
                    }
                }}
            >
                <button onClick={closeModal} style={{ position: 'absolute', right: 20, top: 20 }}>X</button>
                <img src={recipe.image} alt="recipe" className="w-1/2 h-auto" />
                <div className="w-1/2 p-4">
                    <h2 className="text-4xl mb-4 text-center">{recipe.title}</h2>
                    <h3 className="text-2xl mb-4 text-center">{recipe.author}</h3>
                    <p className="mx-5">{recipe.body}</p>
                    <button onClick={closeModal} style={{ position: 'absolute', right: 20, bottom: 20 }}>Close</button>
                </div>
            </Modal>
        </div>
    );
};

export default Recipe;
