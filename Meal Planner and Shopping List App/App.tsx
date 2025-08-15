import React, { useState, useEffect } from 'react';
import { Calendar, Book, ShoppingCart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import Header from './components/custom/Header';
import MealPlanTab from './components/custom/MealPlanTab';
import RecipeTab from './components/custom/RecipeTab';
import GroceryListTab from './components/custom/GroceryListTab';
import ChatBubble from './components/custom/ChatBubble';
import { mealData } from './mealData';
import { shoppingListData } from './shoppingListData';
import { compliments } from './compliments';
import { Recipe } from './types';

export default function App() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeTab, setActiveTab] = useState<string>("plan");
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [openDays, setOpenDays] = useState<Set<string>>(new Set());

  // Local storage key
  const STORAGE_KEY = 'pants-pantry-grocery-list';

  // Load shopping list state from localStorage on component mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedItems = JSON.parse(saved);
        setCheckedItems(new Set(parsedItems));
      }
    } catch (error) {
      console.error('Failed to load shopping list from localStorage:', error);
    }
  }, []);

  // Save shopping list state to localStorage whenever checkedItems changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(checkedItems)));
    } catch (error) {
      console.error('Failed to save shopping list to localStorage:', error);
    }
  }, [checkedItems]);

  const toggleItemCheck = (itemId: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const toggleDay = (day: string) => {
    setOpenDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
      }
      return newSet;
    });
  };

  const createItemId = (category: string, item: string) => {
    return `${category}-${item}`.replace(/[^a-zA-Z0-9-]/g, '');
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setActiveTab("recipes");
    // Smooth scroll to top when switching to recipe tab
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-amber-50">
      <div className="max-w-2xl mx-auto bg-white shadow-2xl min-h-screen border-x border-sky-100">
        <Header />

        {/* Main Content */}
        <main className="p-4 sm:p-6 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-14 bg-gradient-to-r from-sky-100 via-emerald-100 to-amber-100 p-1 rounded-xl shadow-lg">
              <TabsTrigger 
                value="plan" 
                className="flex items-center gap-1 sm:gap-2 font-semibold text-sky-700 data-[state=active]:bg-white data-[state=active]:text-sky-800 data-[state=active]:shadow-md rounded-lg text-xs sm:text-sm"
              >
                <Calendar className="h-4 w-4" />
                <span>Meal Plan</span>
              </TabsTrigger>
              <TabsTrigger 
                value="recipes" 
                className="flex items-center gap-1 sm:gap-2 font-semibold text-emerald-700 data-[state=active]:bg-white data-[state=active]:text-emerald-800 data-[state=active]:shadow-md rounded-lg text-xs sm:text-sm"
              >
                <Book className="h-4 w-4" />
                <span>Recipes</span>
              </TabsTrigger>
              <TabsTrigger 
                value="grocery" 
                className="flex items-center gap-1 sm:gap-2 font-semibold text-amber-700 data-[state=active]:bg-white data-[state=active]:text-amber-800 data-[state=active]:shadow-md rounded-lg text-xs sm:text-sm"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Grocery List</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="plan">
              <MealPlanTab
                mealData={mealData}
                openDays={openDays}
                toggleDay={toggleDay}
                handleRecipeClick={handleRecipeClick}
              />
            </TabsContent>

            <TabsContent value="recipes">
              <RecipeTab selectedRecipe={selectedRecipe} />
            </TabsContent>

            <TabsContent value="grocery">
              <GroceryListTab
                shoppingListData={shoppingListData}
                checkedItems={checkedItems}
                toggleItemCheck={toggleItemCheck}
                createItemId={createItemId}
              />
            </TabsContent>
          </Tabs>
        </main>
        
        <ChatBubble compliments={compliments} />
      </div>
    </div>
  );
}