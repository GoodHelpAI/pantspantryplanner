export interface Recipe {
    name: string;
    ingredients: string[];
    steps: string;
}

export interface MealData {
    [day: string]: {
        [mealType: string]: Recipe;
    };
}

export interface ShoppingListData {
    [category: string]: string[];
}
