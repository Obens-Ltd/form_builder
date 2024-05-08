import React, { createContext, useCallback, useContext, useState } from 'react';

import ObjectID from 'bson-objectid';

interface Ingredient {
  id: any;
  name: string;
  tamplet?: any[];
}

// {
//   step: {
//     id: number;
//     name: string;
//     form : {}
//   }
// }

interface IngredientContextType {
  ingredients: Ingredient[];
  addIngredient: (name: string) => void;
  deleteIngredient: (id: string) => void;
  AddStepToIng: (id: string, step: any) => void;
}

const initialState = {
  ingredients: [],
  addIngredient: (name: string) => {},
  deleteIngredient: (id: string) => {},
  AddStepToIng: (id: string, step: any) => {},
};

const IngredientContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const addIngredient = (name: string) => {
    const newIngredient: Ingredient = {
      id: ObjectID().id,
      name,
    };
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  };

  const deleteIngredient = (id: string) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== id),
    );
  };

  const AddStepToIng = useCallback(
    (id: string, step: any) => {
      const newIngredients = ingredients.map((ingredient) => {
        if (ingredient.id === id) {
          return {
            ...ingredient,
            tamplet: ingredient?.tamplet
              ? [...ingredient?.tamplet, step]
              : [step],
          };
        }
        return ingredient;
      });
      console.log(newIngredients, step, id);
      setIngredients(newIngredients);
    },
    [ingredients],
  );

  return (
    <IngredientContext.Provider
      value={{ ingredients, addIngredient, deleteIngredient, AddStepToIng }}
    >
      {children}
    </IngredientContext.Provider>
  );
};

const IngredientContext = createContext<IngredientContextType>(initialState);

const useIngredient = () => {
  const context = useContext(IngredientContext);
  if (context === undefined) {
    throw new Error('useIngredient must be used within a IngredientProvider');
  }
  return context;
};

export { IngredientContextProvider, useIngredient };
